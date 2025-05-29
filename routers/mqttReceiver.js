const mqtt = require('mqtt');
const activityModel = require('../models/activityModels');
const sensorModel = require('../models/sensorModels');
const mqttConnectionModel = require('../models/mqttConnectionModel');
const conexao = require('../infraestrutura/conexao');

// Configuração do broker MQTT
const brokerUrl = 'mqtt://localhost:1883'; // ou IP do broker se estiver remoto
const client = mqtt.connect(brokerUrl);

// Assinar tópicos
const topicActivity = 'activity/data';
const topicSensor = 'sensor/data';
const topicConnection = 'mqtt/connection'

client.on('connect', () => {
  console.log('Connected to MQTT broker!');
  client.subscribe([topicActivity, topicSensor, topicConnection], (error) => {
    if (error) {
      console.error('Error subscribing at topic:', error);
    } else {
      console.log(`Subscribed at these topics: ${topicActivity}, ${topicSensor}`);
    }
  });
});

// Recebe mensagens
client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    if (topic === topicActivity) {
      // Exemplo de payload esperado:
      // { device_id: 1, speed: 10.5, distance: 100, duration_seconds: 30, weight_g: 500, topic: "activity/data" }

      const activityData = {
        device_id: payload.device_id,
        speed: payload.speed,
        distance: payload.distance,
        duration_seconds: payload.duration_seconds,
        weight_g: payload.weight_g,
        topic: topic,
        raw_payload: message.toString()
      };

      await activityModel.criar(activityData);
      console.log("Activity entered into the database!");
    }

    if (topic === topicSensor) {
      // Exemplo de payload esperado:
      // { device_id: 2, sensor: "temp", value: 22.3, topic: "sensor/data" }

      const sensorData = {
        device_id: payload.device_id,
        sensor: payload.sensor,
        value: payload.value,
        topic: topic
      };

      await sensorModel.create(sensorData);
      console.log("Sensor inserted into the database!");
    }

    if (topic === topicConnection){

        const logData = {
            event_type: payload.event_type,
            message: payload.message
        };

        await mqttConnectionModel.create(logData);
        console.log("MQTT Event created.")
    }

  } catch (error) {
    console.error("Error processing MQTT message:", error.message);
  }
});

client.on('error', (error) => {
  console.error("MQTT Connection wrong:", error);
});
