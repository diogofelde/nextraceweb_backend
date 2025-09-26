const express = require('express');
const router = express.Router();
const { getIntegracaoAPIsData } = require('../controllers/integracaoapisController');

router.get('/', getIntegracaoAPIsData);

module.exports = router;
