const conexao = require("../infraestrutura/conexao");
class DeviceModel {
  listar() {
    const sql = "select * from devices";
    return new Promise((resolve, reject) => {
      conexao.query(sql, {}, (error, resposta) => {
        if (error) {
          console.log("Erro ao listar dispositivos.");
          reject(error);
        }
        console.log("Dispositivos listados com sucesso.");
        resolve(resposta);
      });
    });
  }

  criar(newDevice){
    const sql = "insert into devices (device_name, device_type) values (?, ?)";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [newDevice.device_name, newDevice.device_type], (error, resposta) => {
        if (error) {
          console.log("Erro ao criar dispositivo.");
          reject(error);
        }
        console.log("Dispositivo criado com sucesso.");
        resolve(resposta);
      });
    });
  }

    atualizar(updatedDevice, id){
    const sql = "update devices set device_name = ?, device_type = ? where device_id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [updatedDevice.device_name, updatedDevice.device_type, id], (error, resposta) => {
        if (error) {
          console.log("Erro ao criar dispositivo.");
          reject(error);
        }
        console.log("Dispositivo criado com sucesso.");
        resolve(resposta);
      });
    });
  }
}

module.exports = new DeviceModel();
