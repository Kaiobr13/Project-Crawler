const { Router } = require('express');
const routes = Router();

routes.get('/logs', (req, res) => {
    res.send('Aqui estão sendo listados todos os logs');
});

routes.post('/logs', (req, res) => {
    res.send('Aqui está sendo criado um log');
});

routes.put('/log/:id', (req, res) => {
    const { id } = req.params;
    res.send('Aqui está sendo atualizado o log ' + id);
});

routes.delete('/log/:id', (req, res) => {
    const { id } = req.params;
    res.send('Aqui está sendo deletado o log ' + id);
});

module.exports = routes;