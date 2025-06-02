const mqtt = require("mqtt");
const activityModel = require("../models/activityModels");
const sensorModel = require("../models/sensorModels");
const mqttConnectionModel = require("../models/mqttConnectionModel");
const conexao = require("../infraestrutura/conexao");

let carStats = {
  lastDistance: 0,
  lastStatus: "desconhecido",
  lastUpdate: null,
  totalMessages: 0,
  connectionTime: new Date(),
  mode: "manual",
};

const mqttOptions = {
  username: "kaio1234",
  password: "Kaio1234",
  protocol: "mqtts",
  port: 8883,
};

const client = mqtt.connect(
  "mqtts://ee574460ff7c47c288333a3811a5ec26.s1.eu.hivemq.cloud",
  mqttOptions
);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topics, (err) => {
    if (err) {
      console.error("Failed to subscribe:", err);
    } else {
      console.log("Subscribed to topics:", topics);
    }
  });
});

const topics = [
  "activity/data",
  "sensor/data",
  "mqtt/connection",
  "carro/distancia",
  "carro/status",
  "carro/cmd",
];

function sendCarCommand(command) {
  if (client.connected) {
    client.publish(topicCarCommand, command);
    console.log(`Comando enviado para Arduino: ${command}`);
    logMqttEvent("command_sent", `Command sent to car: ${command}`);
    return true;
  } else {
    console.error("MQTT not connected, cannot send command");
    return false;
  }
}

async function logMqttEvent(eventType, message) {
  try {
    const logData = {
      event_type: eventType,
      message: message,
    };
    await mqttConnectionModel.create(logData);
  } catch (error) {
    console.error("Error logging MQTT event:", error);
  }
}

global.lastDistance = null;
global.lastsensorData = null;
global.lastconection = null;
global.lastactivitydata = null;
global.lastcarrostatus = null;
global.lastcarrocmd = null;

client.on("message", async (topic, message) => {
  try {
    const messageStr = message.toString();
    const timestamp = new Date().toISOString();

    carStats.totalMessages++;
    carStats.lastUpdate = timestamp;

    console.log(`[${timestamp}] Topic: ${topic} | Message: ${messageStr}`);

    if (topic === topicActivity) {
      const payload = JSON.parse(messageStr);
      const activityData = {
        device_id: payload.device_id,
        speed: payload.speed,
        distance: payload.distance,
        duration_seconds: payload.duration_seconds,
        weight_g: payload.weight_g,
        topic: topic,
        raw_payload: messageStr,
      };

      if (topic === "carro/distancia")
        global.lastDistance = parseFloat(msg);
      if (topic === "sensor/data")
        global.lastsensorData = parseFloat(msg);
      if (topic === "mqtt/connection")
        global.lastconection = parseFloat(msg);
      if (topic === "activity/data")
        global.lastactivitydata = parseFloat(msg);

      if (topic === "carro/status")
        currentcarrostatus = parseFloat(msg);
      if (topic === "carro/cmd")
        global.lastcarrocmd = parseFloat(msg);

      await activityModel.criar(activityData);
      console.log("Activity entered into the database!");
    }

    if (topic === topicSensor) {
      const payload = JSON.parse(messageStr);
      const sensorData = {
        device_id: payload.device_id,
        sensor: payload.sensor,
        value: payload.value,
        topic: topic,
      };

      await sensorModel.create(sensorData);
      console.log("Sensor data inserted into the database!");
    }

    if (topic === topicConnection) {
      const payload = JSON.parse(messageStr);
      const logData = {
        event_type: payload.event_type,
        message: payload.message,
      };

      await mqttConnectionModel.create(logData);
      console.log("MQTT Event created.");
    }

    if (topic === topicCarDistance) {
      const distance = parseFloat(messageStr);
      carStats.lastDistance = distance;

      console.log(`Distância do carro: ${distance} cm`);

      try {
        const sensorData = {
          device_id: 1,
          sensor: "ultrasonic_distance",
          value: distance,
          topic: topic,
        };

        await sensorModel.create(sensorData);
        console.log("Distance data saved to database");

        if (distance < 10) {
          console.log(
            "ALERTA: Obstáculo muito próximo! Enviando comando de parada..."
          );
          sendCarCommand("S");
        }
      } catch (error) {
        console.error("Error saving distance data:", error);
      }
    }

    if (topic === topicCarStatus) {
      carStats.lastStatus = messageStr;
      console.log(`Status do carro: ${messageStr}`);

      if (messageStr.includes("automatico")) {
        carStats.mode = "automatic";
      } else if (messageStr.includes("manual")) {
        carStats.mode = "manual";
      }

      try {
        const logData = {
          event_type: "car_status",
          message: messageStr,
        };

        await mqttConnectionModel.create(logData);
        console.log("Car status logged");
      } catch (error) {
        console.error("Error logging car status:", error);
      }
    }

    if (topic === topicCarSensorData) {
      console.log(`Dados dos sensores do carro: ${messageStr}`);

      try {
        const payload = JSON.parse(messageStr);
        console.log("Sensores recebidos:", payload);

        for (const [sensorType, value] of Object.entries(payload)) {
          if (typeof value === "number" || !isNaN(parseFloat(value))) {
            const sensorData = {
              device_id: 1,
              sensor: `car_${sensorType}`,
              value: parseFloat(value),
              topic: topic,
            };

            await sensorModel.create(sensorData);
            console.log(`${sensorType}: ${value} saved to database`);
          }
        }

        if (payload.distance) carStats.lastDistance = payload.distance;
        if (payload.mode) carStats.mode = payload.mode;
      } catch (error) {
        console.error("Error processing car sensor data:", error);

        const logData = {
          event_type: "car_sensor_raw",
          message: messageStr,
        };
        await mqttConnectionModel.create(logData);
      }
    }

    if (topic === topicCarTelemetry) {
      console.log(`Telemetria do carro: ${messageStr}`);

      try {
        const payload = JSON.parse(messageStr);
        console.log("Telemetria completa:", payload);

        const activityData = {
          device_id: 1,
          speed: payload.current_speed || 0,
          distance: payload.distance_traveled || 0,
          duration_seconds: payload.runtime || 0,
          weight_g: payload.load || 0,
          topic: topic,
          raw_payload: messageStr,
        };

        await activityModel.criar(activityData);
        console.log("Car telemetry saved as activity");

        const additionalSensors = [
          { name: "obstacle_distance", value: payload.obstacle_distance },
          { name: "runtime", value: payload.runtime },
          { name: "status", value: payload.status, isText: true },
        ];

        for (const sensor of additionalSensors) {
          if (sensor.value !== undefined) {
            if (sensor.isText) {
              const logData = {
                event_type: `car_${sensor.name}`,
                message: String(sensor.value),
              };
              await mqttConnectionModel.create(logData);
            } else if (!isNaN(parseFloat(sensor.value))) {
              const sensorData = {
                device_id: 1,
                sensor: `car_${sensor.name}`,
                value: parseFloat(sensor.value),
                topic: topic,
              };
              await sensorModel.create(sensorData);
            }
          }
        }

        // Atualizar estatísticas locais
        carStats.mode = payload.mode || carStats.mode;
        if (payload.obstacle_distance)
          carStats.lastDistance = payload.obstacle_distance;
      } catch (error) {
        console.error("Error processing car telemetry:", error);

        // Salvar como evento bruto se falhar o parsing
        const logData = {
          event_type: "car_telemetry_raw",
          message: messageStr,
        };
        await mqttConnectionModel.create(logData);
      }
    }
  } catch (error) {
    console.error("Error processing MQTT message:", error.message);
    console.error("Topic:", topic, "Message:", message.toString());
  }
});

client.on("error", (error) => {
  console.error("MQTT Connection error:", error);
  logMqttEvent("connection_error", error.message);
});

client.on("reconnect", () => {
  console.log("Attempting to reconnect to MQTT broker...");
  logMqttEvent("reconnect_attempt", "Attempting to reconnect to broker");
});

client.on("close", () => {
  console.log("MQTT connection closed");
  logMqttEvent("connection_closed", "MQTT connection closed");
});

client.on("offline", () => {
  console.log("MQTT client offline");
  logMqttEvent("client_offline", "MQTT client went offline");
});

function getMQTTStatus() {
  return {
    connected: client.connected,
    reconnecting: client.reconnecting,
    connectionCount: client.options.connectTimeout,
    carStats: carStats,
  };
}

async function getDataStats() {
  try {
    return {
      status: "active",
      lastUpdate: new Date().toISOString(),
      carStats: carStats,
      mqtt: {
        connected: client.connected,
        totalMessages: carStats.totalMessages,
      },
    };
  } catch (error) {
    console.error("Error getting data stats:", error);
    return { status: "error", error: error.message };
  }
}

function controlCar(command) {
  return sendCarCommand(command);
}

function getCarStats() {
  return carStats;
}

function testCarCommands() {
  console.log("Testando comandos do carro...");
  setTimeout(() => sendCarCommand("F"), 1000);
  setTimeout(() => sendCarCommand("S"), 3000);
  setTimeout(() => sendCarCommand("L"), 4000);
  setTimeout(() => sendCarCommand("S"), 6000);
  setTimeout(() => sendCarCommand("A"), 7000);
}

console.log("MQTT Receiver started");
console.log("Waiting for connection to MQTT broker...");
console.log("Ready to receive data from:");
console.log("   - Sistema: activity/data, sensor/data, mqtt/connection");
console.log(
  "   - Arduino: carro/distancia, carro/status, carro/sensores, carro/telemetria"
);
console.log("");
console.log("Dashboard commands flow: Dashboard → MQTT → Arduino");
console.log("Data flow: Arduino → MQTT → Node.js → Database");
console.log("Control flow: Node.js → MQTT → Arduino");
console.log("");

// Monitoramento periódico
setInterval(() => {
  if (client.connected && carStats.totalMessages > 0) {
    console.log(
      `Stats: ${carStats.totalMessages} mensagens | Última distância: ${carStats.lastDistance}cm | Status: ${carStats.lastStatus} | Modo: ${carStats.mode}`
    );
  }
}, 30000); // A cada 30 segundos

module.exports = {
  client,
  getMQTTStatus,
  getDataStats,
  controlCar,
  getCarStats,
  sendCarCommand,
  testCarCommands,
};
