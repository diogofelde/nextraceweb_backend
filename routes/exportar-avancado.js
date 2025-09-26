const express = require('express');
const router = express.Router();
const { exportarAvancado } = require('../controllers/exportacaoavancadaController');

router.post('/', exportarAvancado);

module.exports = router;
