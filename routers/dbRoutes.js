const express = require('express');
const router = express.Router();
const database = require('../infraestrutura/conexao');

router.get('/database', (req, res) => {
    database.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao pegar conexão do pool:', err);
            return res.status(500).json({ error: 'Erro na conexão com o banco de dados.' });
        }

        connection.query('SELECT 1 + 1 AS RESULT', (error, results) => {
            connection.release(); // Libera a conexão pro pool

            if (error) {
                console.error('Erro ao executar query:', error);
                return res.status(500).json({ error: 'Erro ao consultar banco de dados.' });
            }

            res.send('Conexão com o banco de dados OK.');
        });
    });
});

module.exports = router;
