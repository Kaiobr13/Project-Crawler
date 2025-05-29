const mqttModel = require("../models/mqttModels");
class mqttController {
  show() {
    return mqttModel.show();
  }
  create(newLog) {
    return mqttModel.create(newLog);
  }
  update(updatedLog, id) {
    return mqttModel.update(updatedLog, id);
  }
  delete(id) {
    return mqttModel.delete(id);
  }
}

module.exports = new mqttController();
