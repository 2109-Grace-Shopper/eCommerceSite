const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.ENUM(
      'seeds', //included grass starter
      'trees',
      'stock items', //included packs
      'farming utility',
      'seasonal decor'
    ),
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/products/plastic-bag.png',
  },
});

module.exports = Product;
