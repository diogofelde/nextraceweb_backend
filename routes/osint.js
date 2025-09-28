const express = require('express');
const router = express.Router();
const { getOSINTData } = require('../controllers/osintController');

router.get('/', getOSINTData);

module.exports = router;
