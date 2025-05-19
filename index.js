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

app.listen(port, (error) => {
    if (error) {
        console.log("Deu erro.");
        return;
    }
    console.log("Subiu show!");
});