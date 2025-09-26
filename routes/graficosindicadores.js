const express = require('express');
const router = express.Router();
const { getGraficosIndicadoresData } = require('../controllers/graficosindicadoresController');

router.get('/', getGraficosIndicadoresData);

module.exports = router;
