const express = require('express');
const router = express.Router();
const { renderHome } = require('../controllers/invitationController');

router.get('/', renderHome);

module.exports = router;