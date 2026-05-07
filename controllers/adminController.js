const slugify = require('slugify');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Inisialisasi kedua model
const Guest = require('../models/guests')(sequelize, DataTypes);
const Invitation = require('../models/invitations')(sequelize, DataTypes);

exports.renderGenerator = async (req, res) => {
    try {
        // 1. Ambil semua daftar tamu untuk tabel/list di sisi kanan
        const guests = await Guest.findAll({ order: [['createdAt', 'DESC']] });

        // 2. Ambil URL host dinamis (http://localhost:3000)
        const host = `${req.protocol}://${req.get('host')}`;

        // 3. Ambil metadata undangan untuk desain panel sebelah kiri
        let inviteMeta = await Invitation.findOne();

        // Fallback jika database invitations masih kosong agar tidak error
        const meta = inviteMeta ? inviteMeta.toJSON() : {
            wedding_title: 'THE WEDDING OF',
            couple_name: 'IMAM & NANDIRA',
            photo_url: '/images/couple.jpg'
        };

        // 4. Render ke view admin/generator dengan semua data yang dibutuhkan
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

        // Generate slug: "Budi Santoso" -> "budi-santoso"
        let slug = slugify(name, { lower: true, strict: true });

        // Cek duplikasi slug agar link tetap unik
        const existing = await Guest.findOne({ where: { slug } });
        if (existing) {
            // Jika ada yang sama, tambahkan angka acak di belakangnya
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        await Guest.create({ name, slug });

        // Kembali ke halaman generator setelah berhasil simpan
        res.redirect('/admin/generate');
    } catch (error) {
        console.error("Create Guest Error:", error);
        res.status(500).send(error.message);
    }
};