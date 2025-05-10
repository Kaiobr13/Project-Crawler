const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const router = require('./routers');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');
require("dotenv").config();

tabelas.init(conexao);

const app = express();
const port =  3000;
app.use(cors());
router(app);


const inserirDados = async () => {
  try {
    await conexao.promise().query(`
      INSERT INTO devices (device_name, device_type) VALUES
      ('Veículo Alpha', 'vehicle'),
      ('Veículo Bravo', 'vehicle'),
      ('Sensor de Temperatura 01', 'sensor'),
      ('Sensor de Vibração 01', 'sensor')
    `);

    await conexao.promise().query(`
      INSERT INTO activity_log (device_id, speed, distance, duration_seconds, weight_g, topic, raw_payload) VALUES
      (1, 60.5, 120.3, 3600, 500.0, 'veiculo/alpha/activity', '{"speed":60.5,"distance":120.3,"duration":3600,"weight":500}'),
      (2, 75.2, 98.7, 3000, 300.0, 'veiculo/bravo/activity', '{"speed":75.2,"distance":98.7,"duration":3000,"weight":300}'),
      (1, 58.7, 110.5, 3400, 450.0, 'veiculo/alpha/activity', '{"speed":58.7,"distance":110.5,"duration":3400,"weight":450}')
    `);

    await conexao.promise().query(`
      INSERT INTO sensor_data (device_id, sensor, value, topic) VALUES
      (3, 'temperatura', 36.7, 'sensor/temp01/data'),
      (3, 'temperatura', 37.2, 'sensor/temp01/data'),
      (4, 'vibracao', 0.89, 'sensor/vib01/data'),
      (4, 'vibracao', 1.05, 'sensor/vib01/data')
    `);

    console.log('Dados de exemplo inseridos com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir dados de exemplo:', err);
  }
};

inserirDados();

// Endpoint para retornar dados de dispositivos, logs de atividade e dados de sensores
app.get('/api/data', async (req, res) => {
  try {
    // Consultar dispositivos
    const [devices] = await conexao.promise().query('SELECT * FROM devices');
    
    // Consultar logs de atividades
    const [activityLogs] = await conexao.promise().query(`
      SELECT * FROM activity_log
      JOIN devices ON activity_log.device_id = devices.device_id
    `);

    // Consultar dados dos sensores
    const [sensorData] = await conexao.promise().query(`
      SELECT * FROM sensor_data
      JOIN devices ON sensor_data.device_id = devices.device_id
    `);

    // Retornar os dados como JSON
    res.json({
      devices,
      activityLogs,
      sensorData
    });
  } catch (error) {
    console.error('Erro ao consultar dados:', error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});



app.listen(port, (error) => {
    if (error) {
        console.log("Deu erro.");
        return;
    }
    console.log("Subiu show!");
});