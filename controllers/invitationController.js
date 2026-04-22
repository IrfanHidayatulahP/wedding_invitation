const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Guest = require('../models/guests')(sequelize, DataTypes);
const Invitation = require('../models/invitations')(sequelize, DataTypes);

// 1. Fungsi untuk akses umum (Tanpa Slug)
exports.renderHome = async (req, res) => {
    try {
        let inviteMeta = await Invitation.findOne();
        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'IMAM & NANDIRA',
            photo_url: '/images/couple.jpg',
            loading_text: 'LOADING...'
        };

        // Kirim variabel secara langsung (FLAT)
        res.render('home', {
            guestName: 'Guest Name',
            weddingTitle: meta.wedding_title,
            coupleName: meta.couple_name,
            photoUrl: meta.photo_url,
            loadingText: meta.loading_text,
            progress: 0
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
        const guest = await Guest.findOne({ where: { slug: slug } });

        if (!guest) return res.status(404).send('Undangan tidak ditemukan');

        let inviteMeta = await Invitation.findOne();
        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'IMAM & NANDIRA',
            photo_url: '/images/couple.jpg',
            loading_text: 'LOADING...'
        };

        // Kirim variabel secara langsung (FLAT)
        res.render('home', {
            guestName: guest.name,
            weddingTitle: meta.wedding_title,
            coupleName: meta.couple_name,
            photoUrl: meta.photo_url,
            loadingText: meta.loading_text,
            progress: 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};