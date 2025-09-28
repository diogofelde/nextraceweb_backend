const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../controllers/autenticacaoController');

router.post('/', autenticarUsuario);

module.exports = router;
