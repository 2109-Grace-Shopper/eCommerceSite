const router = require('express').Router();
const {
  models: { Product, User },
} = require('../db');
module.exports = router;

const {isAdminCheck} = require('./isAdmin');

