const express = require('express');
const router = express.Router();
const { getControleAcessoData } = require('../controllers/controleacessoController');

router.get('/', getControleAcessoData);

module.exports = router;
