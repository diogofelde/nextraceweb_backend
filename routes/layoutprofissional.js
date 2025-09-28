const express = require('express');
const router = express.Router();
const { getLayoutProfissionalData } = require('../controllers/layoutprofissionalController');

router.get('/', getLayoutProfissionalData);

module.exports = router;
