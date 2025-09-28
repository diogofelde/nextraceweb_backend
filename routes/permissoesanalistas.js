const express = require('express');
const router = express.Router();
const { getPermissoesAnalistasData } = require('../controllers/permissoesanalistasController');

router.get('/', getPermissoesAnalistasData);

module.exports = router;
