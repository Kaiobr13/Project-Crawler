const { Router } = require("express");
const routes = Router();
const deviceController = require("../controllers/devicesController");

routes.get("/DEVlogs", (req, res) => {
  const listaDevices = deviceController.buscar();
  listaDevices
    .then((devices) => res.status(200).json(devices))
    .catch((error) => res.status(400).json(error.message));
});

routes.post("/DEVlogs", (req, res) => {
  const newDevice = req.body;
  const device = deviceController.criar(newDevice);
  device
    .then((deviceCreated) => res.status(201).json(deviceCreated))
    .catch((error) => res.status(400).json(error.message));
});

routes.put("/DEVlog/:id", (req, res) => {
  const { id } = req.params;
  const updatedDevice = req.body;
  const device = deviceController.atualizar(updatedDevice, id);
  device
    .then((resultUpdatedDevice) => res.status(200).json(resultUpdatedDevice))
    .catch((error) => res.status(400).json(error.message));
});

routes.delete("/DEVlog/:id", (req, res) => {
  const { id } = req.params;
  const resposta = deviceController.deletar(id);
  res.send(resposta);
});

module.exports = routes;
