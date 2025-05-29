const activityModel = require("../models/activityModels");

class activityController {
  show() {
    return activityModel.show();
  }
  create() {
    return activityModel.create();
  }
  update(updatedActivity, id) {
    return activityModel.update(updatedActivity, id);
  }
  delete(id) {
    return activityModel.delete;
  }
}

module.exports = new activityController();
