const express = require('express');
const router = express.Router();
const { getIntegracaoAPIsReaisData } = require('../controllers/integracaoapisreaisController');

router.get('/', getIntegracaoAPIsReaisData);

module.exports = router;
