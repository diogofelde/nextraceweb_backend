const express = require('express');
const router = express.Router();
const { getComplianceData } = require('../controllers/complianceController');

router.get('/', getComplianceData);

module.exports = router;
