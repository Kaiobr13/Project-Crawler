//Conexão com a base de dados
const database = mysql.createPool({
    host: 'localhost',
    user: 'mqtt_app',
    password: 'MQtt1234!',
    database: 'crawler'
});

module.exports = database;