const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const router = require('./controllers');
const connection = require('./infraestrutura/database');
require("dotenv").config();

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