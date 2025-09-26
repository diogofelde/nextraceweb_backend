const express = require('express');
const router = express.Router();
const { getAutenticacaoJWTData } = require('../controllers/autenticacaojwtController');

router.get('/', getAutenticacaoJWTData);

module.exports = router;
