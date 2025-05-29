const sensorModel = require("../models/sensorModels")
class sensorController {
  show() {
    return "Buscando sensores...";
  }
  create() {
    return "Criando sensor...";
  }
  update(id) {
    return "Alterando sensor número " + id + "...";
  }
  delete(id) {
    return "Apagando sensor número " + id + "...";
  }
}

module.exports = new sensorController();
