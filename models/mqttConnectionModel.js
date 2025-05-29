const conexao = require("../infraestrutura/conexao");
class MqttConnectionModel {
  show() {
    const sql = "SELECT * FROM mqtt_connection_log";
    return new Promise((resolve, reject) => {
      conexao.query(sql, {}, (error, answer) => {
        if (error) {
          console.log("Error at showing the MQTT connection logs.");
          reject(error);
        }
        console.log("MQTT connection logs showed successfully.");
        resolve(answer);
      });
    });
  }

  create(newLog) {
    const sql = `
      INSERT INTO mqtt_connection_log (event_type, message)
      VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [newLog.event_type, newLog.message],
        (error, answer) => {
          if (error) {
            console.log("Error at creating the MQTT connection log.");
            reject(error);
          }
          console.log("MQTT connection log created successfully.");
          resolve(answer);
        }
      );
    });
  }

  update(updatedLog, id) {
    const sql = `
      UPDATE mqtt_connection_log 
      SET event_type = ?, message = ?
      WHERE conlog_id = ?`;

    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [updatedLog.event_type, updatedLog.message, id],
        (error, answer) => {
          if (error) {
            console.log("Error at updating the MQTT connection log.");
            reject(error);
          }
          console.log("MQTT connection log updated successfully.");
          resolve(answer);
        }
      );
    });
  }

  delete(id) {
    const sql = "DELETE FROM mqtt_connection_log WHERE conlog_id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [id], (error, answer) => {
        if (error) {
          console.log("Error at deleting the MQTT connection log.");
          reject(error);
        }
        console.log("MQTT connection log deleted successfully.");
        resolve(answer);
      });
    });
  }
}

module.exports = new MqttConnectionModel();
