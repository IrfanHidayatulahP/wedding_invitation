const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.renderGenerator);
router.post('/generate', adminController.createGuest);

module.exports = router;