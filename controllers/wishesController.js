const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Inisialisasi model Wishes
const Wish = require('../models/wishes')(sequelize, DataTypes);

exports.submitWish = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ success: false, message: "Nama dan pesan harus diisi." });
        }

        const newWish = await Wish.create({ name, message });

        // Kirim respon sukses beserta data yang baru disimpan
        res.json({
            success: true,
            message: "Ucapan berhasil dikirim!",
            data: newWish
        });
    } catch (error) {
        console.error("Submit Wish Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};