  const conexao = require("../infraestrutura/conexao");
  class SensorModel {
    show() {
      const sql = "select * from sensor_data";
      return new Promise((resolve, reject) => {
        conexao.query(sql, {}, (error, answer) => {
          if (error) {
            console.log("Error at showing the devices.");
            reject(error);
          }
          console.log("Devices showed successfully.");
          resolve(answer);
        });
      });
    }

  create(newSensor) {
  const sql = `
    INSERT INTO sensor_data (
      device_id, sensor, value, topic
    ) VALUES (?, ?, ?, ?)`;

  const valores = [
    newSensor.device_id,
    newSensor.sensor,
    newSensor.value,
    newSensor.topic
  ];

  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (error, answer) => {
      if (error) {
        console.log("Erro ao criar dado do sensor.");
        reject(error);
      }
      console.log("Dado do sensor criado com sucesso.");
      resolve(answer);
    });
  });
}

    update(updatedData, id) {
      const sql =
        "update sensor_data set device_name = ?, device_type = ? where device_id = ?";
      return new Promise((resolve, reject) => {
        conexao.query(
          sql,
          [updatedDevice.device_name, updatedDevice.device_type, id],
          (error, answer) => {
            if (error) {
              console.log("Error at updating the chosen data.");
              reject(error);
            }
            console.log("Data updated successfully.");
            resolve(answer);
          }
        );
      });
    }

      delete(id) {
      const sql = "delete from devices where device_id =?";
      return new Promise((resolve, reject) => {
        conexao.query(sql, [id], (error, answer)=>{
          if (error){
            console.log("Error at deleting the chosen data.");
            reject(error);
          }
          console.log("Data deleted successfully.");
          resolve(answer);
        });
      });
    }
  }

  module.exports = new SensorModel();
