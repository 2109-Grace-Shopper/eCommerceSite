const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('cart', {
  totalAmount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM('in cart', 'pending', 'completed'),
    defaultValue: 'in cart',
  },
});

module.exports = Order;
