const slugify = require('slugify');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
// Inisialisasi model Guest
const Guest = require('../models/guests')(sequelize, DataTypes);

exports.renderGenerator = async (req, res) => {
    try {
        const guests = await Guest.findAll({ order: [['createdAt', 'DESC']] });

        const host = `${req.protocol}://${req.get('host')}`;

        res.render('admin/generator', {
            guests,
            host // Kirim variabel host ke view
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createGuest = async (req, res) => {
    try {
        const { name } = req.body;
        // Generate slug: "Budi Santoso" -> "budi-santoso"
        let slug = slugify(name, { lower: true, strict: true });

        // Cek duplikasi slug
        const existing = await Guest.findOne({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        await Guest.create({ name, slug });
        res.redirect('/admin/generate');
    } catch (error) {
        res.status(500).send(error.message);
    }
};