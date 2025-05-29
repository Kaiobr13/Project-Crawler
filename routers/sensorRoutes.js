const { Router } = require("express");
const routes = Router();
const sensorDataController = require("../controllers/sensorController");

routes.get("/Sensorlogs", (req, res) => {
  sensorDataController.show()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error.message));
});

routes.post("/Sensorlogs", (req, res) => {
  const newData = req.body;
  sensorDataController.create(newData)
    .then((createdData) => res.status(201).json(createdData))
    .catch((error) => res.status(400).json(error.message));
});

routes.put("/Sensorlog/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  sensorDataController.update(updatedData, id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error.message));
});

routes.delete("/Sensorlog/:id", (req, res) => {
  const { id } = req.params;
  sensorDataController.delete(id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error.message));
});

module.exports = routes;
