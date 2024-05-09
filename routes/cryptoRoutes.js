const express = require('express');
const router = express.Router();
const { getAllCryptos, getPrice } = require('../controllers/cryptoController');

router.get('/all-cryptos', getAllCryptos);
router.get('/price', getPrice);

module.exports = router;
