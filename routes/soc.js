const express = require('express');
const router = express.Router();
const { getSOCData } = require('../controllers/socController');

router.get('/', getSOCData);

module.exports = router;
