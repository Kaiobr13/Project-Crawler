const conexao = require("../infraestrutura/conexao");
class DeviceModel {
  show() {
    const sql = "select * from devices";
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

  create(newDevice) {
    const sql = "insert into devices (device_name, device_type) values (?, ?)";
    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [newDevice.device_name, newDevice.device_type],
        (error, answer) => {
          if (error) {
            console.log("Error at creating the device.");
            reject(error);
          }
          console.log("Device created successfully.");
          resolve(answer);
        }
      );
    });
  }

  update(updatedDevice, id) {
    const sql =
      "update devices set device_name = ?, device_type = ? where device_id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [updatedDevice.device_name, updatedDevice.device_type, id],
        (error, answer) => {
          if (error) {
            console.log("Error at updating the chosen device.");
            reject(error);
          }
          console.log("Device updated successfully.");
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
          console.log("Error at deleting the chosen device.");
          reject(error);
        }
        console.log("Device deleted successfully.");
        resolve(answer);
      });
    });
  }
}

module.exports = new DeviceModel();
