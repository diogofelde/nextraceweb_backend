const express = require('express');
const router = express.Router();
const { getProtecaoRotasData } = require('../controllers/protecaorotasController');

router.get('/', getProtecaoRotasData);

module.exports = router;
