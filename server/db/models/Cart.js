const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  totalAmount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Cart;
