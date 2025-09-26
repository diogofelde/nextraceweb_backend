const express = require('express');
const router = express.Router();
const { getTIData } = require('../controllers/tiController');

router.get('/', getTIData);

module.exports = router;
