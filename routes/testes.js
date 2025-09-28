const express = require('express');
const router = express.Router();
const { simularAtaque } = require('../controllers/ambienteTestesController');

router.get('/', simularAtaque);

module.exports = router;
