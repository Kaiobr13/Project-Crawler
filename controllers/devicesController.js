const deviceModel = require("../models/devicesModels");
class deviceController {
  buscar() {
    return deviceModel.listar();
  }
  criar(newDevice) {
    return deviceModel.criar(newDevice);
  }
  atualizar(updatedDevice, id) {
    return deviceModel.atualizar(updatedDevice, id);
  }
  deletar(id) {
    return "Apagando dispositivo número " + id + "...";
  }
}

module.exports = new deviceController();
