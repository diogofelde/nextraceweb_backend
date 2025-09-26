const express = require('express');
const router = express.Router();
const { validarModulos } = require('../controllers/validacaoModulosController');

router.get('/', validarModulos);

module.exports = router;
