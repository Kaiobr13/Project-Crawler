#include <WiFi.h>
#include <PubSubClient.h>
#include <ESP32Servo.h>
#include <Arduino.h>

// === Configuração Wi-Fi e MQTT ===
const char* ssid = "Visitors";
const char* password = "";

// === HiveMQ Broker === //
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "carro/telemetria";

// === Clien MQTT === //
WiFiClient espClient;
PubSubClient client(espClient);

// === Tópicos MQTT ===
const char* cmdTopic = "carro/cmd";
const char* velTopic = "carro/velocidade";
const char* distTopic = "carro/distancia";
const char* statusTopic = "carro/status";

// === Pinos ===
const int servoFrentePin = 10;
const int servoTrasPin   = 21;
const int escPin         = 5;
const int trigPin        = 12;
const int echoPin        = 14;

// === Estados ===
bool modoAutomatico = false;
char comando = 'S';
int velocidade = 100;

// === Servos ===
Servo servoFrente;
Servo servoTras;
Servo escMotor;
bool servoTrasConectado = false;

// === Funções MQTT ===
void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }

  if (String(topic) == cmdTopic) {
    comando = msg[0];
    modoAutomatico = (comando == 'A');
    if (!modoAutomatico) executarComando(comando);
    client.publish(statusTopic, "Comando executado");
  } else if (String(topic) == velTopic) {
    velocidade = constrain(msg.toInt(), 0, 100);
    Serial.printf("Velocidade definida para %d%%\n", velocidade);
    client.publish(statusTopic, "Velocidade definida");
  }
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.printf("Conectando a %s", ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando MQTT...");
    if (client.connect("ESP32Carro")) {
      Serial.println("conectado!");
      client.subscribe(cmdTopic);
      client.subscribe(velTopic);
    } else {
      Serial.print("falhou, rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

// === Setup Geral ===
void setup() {
  Serial.begin(115200);

  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);

  if (servoFrente.attach(servoFrentePin, 500, 2400)) {
    Serial.println("Servo da frente conectado.");
  }

  if (servoTras.attach(servoTrasPin, 500, 2400)) {
    Serial.println("Servo traseiro conectado.");
  }

  resetDirecao();

  escMotor.setPeriodHertz(50);
  escMotor.attach(escPin, 1000, 2000);
  pararMotor();
  delay(3000);
  Serial.println("ESC armado.");

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Serial.println("Pronto para receber comandos via MQTT.");
}

// === Loop ===
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if (modoAutomatico) modoAuto();
}

// === Comandos ===
void executarComando(char cmd) {
  switch (cmd) {
    case 'F': moverFrente(); break;
    case 'B': moverTras(); break;
    case 'L': virarEsquerda(); break;
    case 'R': virarDireita(); break;
    case 'S': pararMotor(); resetDirecao(); break;
    case 'M': modoAutomatico = false; break;
  }
}

void moverFrente() {
  int pwm = 1500 + (velocidade * 5);
  Serial.printf("Frente PWM: %d\n", pwm);
  escMotor.writeMicroseconds(pwm);
}

void moverTras() {
  int pwm = 1500 - (velocidade * 5);
  pwm = max(pwm, 1000);
  Serial.printf("Trás PWM: %d\n", pwm);
  escMotor.writeMicroseconds(pwm);
}

void pararMotor() {
  Serial.println("Parar motor");
  escMotor.writeMicroseconds(1500);
}

void setDirecao(int frente, int tras) {
  servoFrente.write(frente);
  delay(2);
  if (servoTrasConectado) {
    servoTras.write(tras);
  }
}

void virarEsquerda() {
  Serial.println("Esquerda");
  setDirecao(45, 110);
}

void virarDireita() {
  Serial.println("Direita");
  setDirecao(135, 70);
}

void resetDirecao() {
  Serial.println("Centro");
  setDirecao(90, 90);
}

// === Modo Automático ===
void modoAuto() {
  long dist = medirDistancia();
  char distMsg[16];
  snprintf(distMsg, sizeof(distMsg), "%ld", dist);
  client.publish(distTopic, distMsg);

  if (dist < 20) {
    Serial.println("Obstáculo!");
    pararMotor();
    resetDirecao();
    delay(300);
    virarDireita();
    delay(500);
    moverFrente();
    delay(700);
    resetDirecao();
  } else {
    moverFrente();
  }
}

long medirDistancia() {
  long soma = 0;
  for (int i = 0; i < 5; i++) {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    long duracao = pulseIn(echoPin, HIGH, 30000);
    if (duracao == 0) duracao = 30000;
    soma += duracao;
    delay(10);
  }
  long media = soma / 5;
  return media * 0.034 / 2;
}