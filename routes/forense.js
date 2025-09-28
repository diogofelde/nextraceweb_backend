const express = require('express');
const router = express.Router();
const { getForenseData } = require('../controllers/forenseController');

router.get('/', getForenseData);

module.exports = router;
