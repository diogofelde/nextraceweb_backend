const express = require('express');
const router = express.Router();
const { getMultiplosModulosData } = require('../controllers/multiplosmodulosController');

router.get('/', getMultiplosModulosData);

module.exports = router;
