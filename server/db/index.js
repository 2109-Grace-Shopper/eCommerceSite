//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const OrderLine = require('./models/OrderLine');
const Cart = require('./models/Cart');

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(OrderLine);
OrderLine.belongsTo(Cart);
OrderLine.hasOne(Product);
Product.belongsTo(OrderLine);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderLine,
    Cart,
  },
};
