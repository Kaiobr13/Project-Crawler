const express = require('express');
const app = express();
const port =  3000;
const cors = require('cors');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const router = require('./routers');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');
const { param } = require('./routers/devicesRoutes');
require("dotenv").config();

tabelas.init(conexao);
router(app, express);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require('./routers/mqttReceiver');

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/dashboard.html');
});

const path = require('path');
app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/details.html'));
});

app.listen(port, (error) => {
    if (error) {
        console.log("Error.");
        return;
    }
    console.log(`Server running at http://localhost:${port}`);
});