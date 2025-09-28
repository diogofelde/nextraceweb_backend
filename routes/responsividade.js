const express = require('express');
const router = express.Router();
const { getResponsividadeData } = require('../controllers/responsividadeController');

router.get('/', getResponsividadeData);

module.exports = router;
