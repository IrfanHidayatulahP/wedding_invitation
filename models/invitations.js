const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Invitation = sequelize.define('Invitation', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  guest_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  wedding_title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  couple_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  photo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  loading_text: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'invitations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Invitation;