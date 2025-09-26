const express = require('express');
const router = express.Router();
const { getValidacaoModulosData } = require('../controllers/validacaomodulosController');

router.get('/', getValidacaoModulosData);

module.exports = router;
