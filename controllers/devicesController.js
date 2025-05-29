const deviceModel = require("../models/devicesModels");
class deviceController {
  show() {
    return deviceModel.show();
  }
  create(newDevice) {
    return deviceModel.create(newDevice);
  }
  update(updatedDevice, id) {
    return deviceModel.update(updatedDevice, id);
  }
  delete(id) {
    return deviceModel.delete(id);
  }
}

module.exports = new deviceController();
