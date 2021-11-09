const Sequelize = require('sequelize');
const db = require('../db');

const OrderLine = db.define('orderLine', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderLine;
