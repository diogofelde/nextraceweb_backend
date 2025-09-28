const express = require('express');
const router = express.Router();
const { getManualAnalistasData } = require('../controllers/manualanalistasController');

router.get('/', getManualAnalistasData);

module.exports = router;
