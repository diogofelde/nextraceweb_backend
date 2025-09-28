const express = require('express');
const router = express.Router();
const { getDocumentacaoInternaData } = require('../controllers/documentacaointernaController');

router.get('/', getDocumentacaoInternaData);

module.exports = router;
