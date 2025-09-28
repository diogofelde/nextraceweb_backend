const express = require('express');
const router = express.Router();
const { exportarCompliance } = require('../controllers/exportar-complianceController');

router.get('/', exportarCompliance);

module.exports = router;
