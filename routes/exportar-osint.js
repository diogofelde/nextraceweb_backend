const express = require('express');
const router = express.Router();
const { exportarOSINT } = require('../controllers/exportar-osintController');

router.get('/', exportarOSINT);

module.exports = router;
