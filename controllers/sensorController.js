const sensorModel = require("../models/sensorModels")
class sensorController {
  show() {
    return sensorModel.show();
  }
  //create(newSensor) {
  //  return sensorModel.create(newSensor);
  //}
  update(updatedSensor, id) {
    return sensorModel.update(updatedSensor, id);
  }
  delete(id) {
    return sensorModel.delete(id);
  }
}

module.exports = new sensorController();
