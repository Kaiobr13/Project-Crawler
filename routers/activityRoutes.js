const { Router } = require("express");
const routes = Router();
const activityController = require("../controllers/activityController");

routes.get("/activityLogs", (req, res) => {
  const listaActivity = activityController.show();
  listaActivity
    .then((activity) => res.status(200).json(activity))
    .catch((error) => res.status(400).json(error.message));
});

//routes.post("/activityLogs", (req, res) => {
//  const newActivity = req.body;
//  const activity = activityController.criar(newActivity);
//  activity
//    .then((activityCreated) => res.status(201).json(activityCreated))
//    .catch((error) => res.status(400).json(error.message));
//});

routes.put("/activityLog/:id", (req, res) => {
  const { id } = req.params;
  const updatedActivity = req.body;
  const activity = activityController.update(updatedActivity, id);
  activity
    .then((resultUpdatedActivity) => res.status(200).json(resultUpdatedActivity))
    .catch((error) => res.status(400).json(error.message));
});

routes.delete("/activityLog/:id", (req, res) => {
  const { id } = req.params;
  const deletedActivity = activityController.delete(id);
  deletedActivity
    .then((resultDeletedActivity) => res.status(200).json(resultDeletedActivity))
    .catch((error) => res.status(400).json(error.message));
});

module.exports = routes;
