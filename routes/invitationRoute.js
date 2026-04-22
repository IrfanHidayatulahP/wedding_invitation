const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');

// Jalur Umum (http://localhost:3000/)
router.get('/', invitationController.renderHome);

// Jalur Tamu Spesifik (http://localhost:3000/i/budi-santoso)
router.get('/i/:slug', invitationController.renderGuestInvitation);

module.exports = router;