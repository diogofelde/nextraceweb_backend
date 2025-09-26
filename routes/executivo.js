const express = require('express');
const router = express.Router();
const { getExecutivoData } = require('../controllers/executivoController');

router.get('/', getExecutivoData);

module.exports = router;
