const express = require('express');
const router = express.Router();
const { getDashboardFuncionalData } = require('../controllers/dashboardfuncionalController');

router.get('/', getDashboardFuncionalData);

module.exports = router;
