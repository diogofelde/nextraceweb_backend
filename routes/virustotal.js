const express = require('express');
const router = express.Router();
const { consultarVirusTotal } = require('../controllers/virustotalController');

router.post('/', consultarVirusTotal);

module.exports = router;
