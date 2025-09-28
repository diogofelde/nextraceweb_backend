const express = require('express');
const router = express.Router();
const { exportarForense } = require('../controllers/exportar-forenseController');

router.get('/', exportarForense);

module.exports = router;
