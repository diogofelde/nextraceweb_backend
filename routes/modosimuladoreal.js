const express = require('express');
const router = express.Router();
const { getModoSimuladoRealData } = require('../controllers/modosimuladorealController');

router.get('/', getModoSimuladoRealData);

module.exports = router;
