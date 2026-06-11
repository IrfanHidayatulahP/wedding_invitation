const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// --- 1. Endpoint Login & Logout (Akses Publik) ---
// Ditambahkan agar admin bisa melakukan autentikasi
router.get('/login', adminController.renderLogin);
router.post('/login', adminController.handleLogin);
router.get('/logout', adminController.logout);

// --- 2. Endpoint Terproteksi (Hanya untuk Admin) ---
// Endpoint '/' tetap ada, namun sekarang dijaga oleh authMiddleware
router.get('/', adminController.authMiddleware, adminController.renderGenerator);

// Endpoint '/generate' tetap ada, namun sekarang dijaga oleh authMiddleware
router.post('/generate', adminController.authMiddleware, adminController.createGuest);

module.exports = router;