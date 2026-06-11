require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/sequelize');
const invitationRoutes = require('./routes/invitationRoute');
const adminRoutes = require('./routes/adminRoute');
const wishesRoutes = require('./routes/wishesRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. TRUST PROXY (Pastikan tetap berada di paling atas)
app.set('trust proxy', 1);

// 2. MIDDLEWARE FORCE HTTPS - VERSI ALL-IN-ONE
app.use((req, res, next) => {
    // Memeriksa segala kemungkinan sinyal HTTPS dari server LiteSpeed/cPanel
    const isHttps = req.secure ||
        req.headers['x-forwarded-proto'] === 'https' ||
        req.headers['x-forwarded-ssl'] === 'on' ||
        req.headers['x-https'] === '1' ||
        req.headers['x-https'] === 'on';

    if (isHttps) {
        return next();
    }

    // Jika tidak terdeteksi HTTPS, langsung paksa belokkan ke jalur aman (301)
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
});

// Middleware Dasar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Konfigurasi Session (Sekarang aman karena berada di bawah payung HTTPS)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: true, // Sekarang berjalan sempurna karena koneksi sudah dipaksa HTTPS di atas
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', invitationRoutes);
app.use('/admin', adminRoutes);
app.use('/wishes', wishesRoutes);

// Database & Server Initialization
(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected with Sequelize');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('DB connection error:', error.message);
    }
})();