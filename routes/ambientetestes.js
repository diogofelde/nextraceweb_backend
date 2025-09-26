const express = require('express');
const router = express.Router();
const { getAmbienteTestesData } = require('../controllers/ambientetestesController');

router.get('/', getAmbienteTestesData);

module.exports = router;
