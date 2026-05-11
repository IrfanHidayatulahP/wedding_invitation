const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Inisialisasi Model
const Guest = require('../models/guests')(sequelize, DataTypes);
const Invitation = require('../models/invitations')(sequelize, DataTypes);
const Wish = require('../models/wishes')(sequelize, DataTypes); // Pastikan inisialisasi seperti ini

// 1. Fungsi untuk akses umum (Tanpa Slug)
exports.renderHome = async (req, res) => {
    try {
        // AMBIL DATA WISHES
        const wishes = await Wish.findAll({ order: [['createdAt', 'DESC']] });

        let inviteMeta = await Invitation.findOne();
        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'IMAM & NANDIRA',
            photo_url: '/images/couple.jpg',
            loading_text: 'LOADING...'
        };

        res.render('home', {
            guestName: 'Guest Name',
            weddingTitle: meta.wedding_title,
            coupleName: meta.couple_name,
            photoUrl: meta.photo_url,
            loadingText: meta.loading_text,
            progress: 0,
            wishes: wishes // Kirim ke view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};

// 2. Fungsi untuk akses Tamu (Dengan Slug)
exports.renderGuestInvitation = async (req, res) => {
    try {
        const { slug } = req.params;

        // AMBIL DATA TAMU & WISHES SECARA PARALEL (Lebih Cepat)
        const [guest, wishes] = await Promise.all([
            Guest.findOne({ where: { slug: slug } }),
            Wish.findAll({ order: [['createdAt', 'DESC']] })
        ]);

        if (!guest) return res.status(404).send('Undangan tidak ditemukan');

        let inviteMeta = await Invitation.findOne();
        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'IMAM & NANDIRA',
            photo_url: '/images/couple.jpg',
            loading_text: 'LOADING...'
        };

        res.render('home', {
            guestName: guest.name,
            weddingTitle: meta.wedding_title,
            coupleName: meta.couple_name,
            photoUrl: meta.photo_url,
            loadingText: meta.loading_text,
            progress: 0,
            wishes: wishes // Kirim ke view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};