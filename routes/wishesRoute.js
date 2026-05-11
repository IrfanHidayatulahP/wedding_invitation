const express = require('express');
const router = express.Router();
const wishesController = require('../controllers/wishesController');

// Route untuk submit wish
router.post('/submit', wishesController.submitWish);

module.exports = router;