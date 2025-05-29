const conexao = require("../infraestrutura/conexao");
class activityModel {
  listar() {
    const sql = "select * from activity_log";
    return new Promise((resolve, reject) => {
      conexao.query(sql, {}, (error, answer) => {
        if (error) {
          console.log("Erro ao listar atividades.");
          reject(error);
        }
        console.log("Atividades listadas com sucesso.");
        resolve(answer);
      });
    });
  }

  //criar(newActivity) {
  //  const sql = `
  //    INSERT INTO activity_log (
  //      device_id, speed, distance, duration_seconds,
  //      weight_g, topic, raw_payload
  //    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  //
  //  const valores = [
  //      new
  //  ];
  //
  //  return new Promise((resolve, reject) => {
  //    conexao.query(
  //      sql,
  //      [],
  //      (error, answer) => {
  //        if (error) {
  //          console.log("Erro ao criar dispositivo.");
  //          reject(error);
  //        }
  //        console.log("Dispositivo criado com sucesso.");
  //        resolve(answer);
  //      }
  //    );
  //  });
  //}
  //
  atualizar(updatedActivity, id) {
    const sql = `
    UPDATE activity_log SET
      device_id = ?, speed = ?, distance = ?, duration_seconds = ?,
      weight_g = ?, topic = ?, raw_payload = ?
    WHERE activitylog_id = ?`;

    const values = [
      updatedActivity.device_id,
      updatedActivity.speed,
      updatedActivity.distance,
      updatedActivity.duration_seconds,
      updatedActivity.weight_g,
      updatedActivity.topic,
      updatedActivity.raw_payload,
      id
    ];

    return new Promise((resolve, reject) => {
      conexao.query(sql, values, (error, answer) => {
        if(error){
          console.log("Erro ao atualizar atividades.");
          reject(error);
        }
        console.log("Atividade atualizada com sucesso.");
        resolve(answer);
      });
    });
  }

  deletar(id) {
    const sql = "delete from devices where device_id =?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [id], (error, answer) => {
        if (error) {
          console.log("Erro ao deletar atividades.");
          reject(error);
        }
        console.log("Atividade deletada com sucesso.");
        resolve(answer);
      });
    });
  }
}

module.exports = new activityModel();
