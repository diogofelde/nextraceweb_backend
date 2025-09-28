const express = require('express');
const router = express.Router();
const { consultarAPI } = require('../controllers/integracaoapisreaisController');

router.post('/', consultarAPI);

module.exports = router;
