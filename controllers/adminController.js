const slugify = require('slugify');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Inisialisasi model
const Guest = require('../models/guests')(sequelize, DataTypes);
const Invitation = require('../models/invitations')(sequelize, DataTypes);

// --- MIDDLEWARE KEAMANAN ---
exports.authMiddleware = (req, res, next) => {
    // Mengecek apakah session isAdmin ada dan bernilai true
    if (req.session && req.session.isAdmin) {
        next(); // Izinkan akses
    } else {
        // Jika tidak ada session, lempar ke halaman login
        res.redirect('/admin/login');
    }
};

// --- AUTH LOGIC ---
exports.renderLogin = (req, res) => {
    // Jika sudah login tapi iseng buka halaman login, arahkan ke generator
    if (req.session.isAdmin) return res.redirect('/admin');

    res.render('admin/login', { error: null });
};

exports.handleLogin = (req, res) => {
    const { password } = req.body;
    // Disarankan password ini ditaruh di .env (contoh: process.env.ADMIN_PASSWORD)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (password === ADMIN_PASSWORD) {
        req.session.isAdmin = true; // Set session
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: 'Password salah!' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/admin/login');
    });
};

// --- CORE LOGIC (Generator) ---
exports.renderGenerator = async (req, res) => {
    try {
        const guests = await Guest.findAll({ order: [['createdAt', 'DESC']] });

        // Pastikan host menggunakan https jika sedang di hosting
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = `${protocol}://${req.get('host')}`;

        let inviteMeta = await Invitation.findOne();

        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'CERIA & RIZKY', // Sesuaikan dengan nama Anda
            photo_url: '/images/SLM09249 (1).JPG'
        };

        res.render('admin/generator', {
            guests,
            host,
            weddingTitle: meta.wedding_title,
            coupleName: meta.couple_name,
            photoUrl: meta.photo_url
        });
    } catch (error) {
        console.error("Admin Render Error:", error);
        res.status(500).send(error.message);
    }
};

exports.createGuest = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ success: false, message: 'Nama harus diisi' });

        let slug = slugify(name, { lower: true, strict: true });
        const existing = await Guest.findOne({ where: { slug } });

        if (existing) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const newGuest = await Guest.create({ name, slug });

        // Gunakan logika protocol yang sama agar link tamu otomatis HTTPS
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = `${protocol}://${req.get('host')}`;

        res.json({
            success: true,
            guest: newGuest,
            host: host
        });
    } catch (error) {
        console.error("Create Guest Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};