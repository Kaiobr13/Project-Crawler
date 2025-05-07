const mysql = require('mysql2');

//Conexão com a base de dados
const database = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'mqtt_app',
    password: 'MQtt1234!',
    database: 'crawler_iot'
});

module.exports = database;