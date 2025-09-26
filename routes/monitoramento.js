const express = require('express');
const router = express.Router();
const { consultarAmeacas } = require('../controllers/monitoramentoglobalController');

router.get('/', consultarAmeacas);

module.exports = router;
