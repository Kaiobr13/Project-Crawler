const { Router } = require("express");
const routes = Router();
const deviceController = require("../controllers/devicesController");

routes.get("/logs", (req, res) => {
  const resposta = deviceController.buscar();
  res.send(resposta);
});

routes.post("/logs", (req, res) => {
  const resposta = deviceController.criar();
  res.send(resposta);
});

routes.put("/log/:id", (req, res) => {
  const { id } = req.params;
  const resposta = deviceController.alterar(id);
  res.send("resposta");
});

routes.delete("/log/:id", (req, res) => {
  const { id } = req.params;
  const resposta = deviceController.deletar(id);
  res.send(resposta);
});

module.exports = routes;
