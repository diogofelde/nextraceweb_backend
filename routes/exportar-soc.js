const express = require('express');
const router = express.Router();
const { exportarSOC } = require('../controllers/exportar-socController');

router.get('/', exportarSOC);

module.exports = router;
