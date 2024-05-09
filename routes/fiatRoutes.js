const express = require('express');
const router = express.Router();
const { getAllFiats } = require('../controllers/fiatController');

router.get('/all-fiats', getAllFiats);

module.exports = router;
