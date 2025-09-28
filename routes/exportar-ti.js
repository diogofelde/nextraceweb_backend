const express = require('express');
const router = express.Router();
const { exportarTI } = require('../controllers/exportar-tiController');

router.get('/', exportarTI);

module.exports = router;
