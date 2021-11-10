const Sequelize = require('sequelize');
const db = require('../db');

const Payment = db.define('payment', {
  type: {
    type: Sequelize.ENUM('Visa', 'MasterCard', 'Discover'),
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isCreditCard: true,
    },
  },
  cvc: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  expDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Payment;
