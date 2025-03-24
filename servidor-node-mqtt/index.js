const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const mqtt = require("mqtt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Conexão com MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// MQTT Client
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  client.subscribe("sensor/data"); // Tópico MQTT
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida do tópico ${topic}:`, message.toString());

  const sensorData = JSON.parse(message); // Supondo que a mensagem seja JSON
  const { sensor, value } = sensorData;

  // Inserir dados no MySQL
  const query = "INSERT INTO sensor_data (sensor, value) VALUES (?, ?)";
  db.query(query, [sensor, value], (err) => {
    if (err) {
      console.error("Erro ao inserir dados no MySQL:", err);
    } else {
      console.log("Dados inseridos com sucesso no MySQL");
    }
  });
});

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Servidor Node.js com MQTT, MySQL e Dashboard");
});

// Rotas do dashboard
const dashboardRoutes = require("./controllers/dashboardController");
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const mqtt = require("mqtt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Conexão com MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// MQTT Client
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  client.subscribe("sensor/data"); // Tópico MQTT
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida do tópico ${topic}:`, message.toString());

  const sensorData = JSON.parse(message); // Supondo que a mensagem seja JSON
  const { sensor, value } = sensorData;

  // Inserir dados no MySQL
  const query = "INSERT INTO sensor_data (sensor, value) VALUES (?, ?)";
  db.query(query, [sensor, value], (err) => {
    if (err) {
      console.error("Erro ao inserir dados no MySQL:", err);
    } else {
      console.log("Dados inseridos com sucesso no MySQL");
    }
  });
});

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Servidor Node.js com MQTT, MySQL e Dashboard");
});

// Rotas do dashboard
const dashboardRoutes = require("./controllers/dashboardController");
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const mqtt = require("mqtt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Conexão com MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// MQTT Client
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  client.subscribe("sensor/data"); // Tópico MQTT
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida do tópico ${topic}:`, message.toString());

  const sensorData = JSON.parse(message); // Supondo que a mensagem seja JSON
  const { sensor, value } = sensorData;

  // Inserir dados no MySQL
  const query = "INSERT INTO sensor_data (sensor, value) VALUES (?, ?)";
  db.query(query, [sensor, value], (err) => {
    if (err) {
      console.error("Erro ao inserir dados no MySQL:", err);
    } else {
      console.log("Dados inseridos com sucesso no MySQL");
    }
  });
});

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Servidor Node.js com MQTT, MySQL e Dashboard");
});

// Rotas do dashboard
const dashboardRoutes = require("./controllers/dashboardController");
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});