const express = require('express');
const router = express.Router();
const { getExportacaoAvancadaData } = require('../controllers/exportacaoavancadaController');

router.get('/', getExportacaoAvancadaData);

module.exports = router;
