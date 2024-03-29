const Sequelize = require('sequelize');
const db = require('../db');

const OrderLine = db.define('orderLine', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 999,
    },
  },
  subTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = OrderLine;
