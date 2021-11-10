const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const OrderLine = require('./models/OrderLine');
const Order = require('./models/Order');
const Address = require('./models/Address');
const Payment = require('./models/Payment');

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Address);
Address.belongsTo(User);

User.hasOne(Payment);
Payment.belongsTo(User);

Address.hasMany(Order);
Order.belongsTo(Address);

Payment.hasMany(Order);
Order.belongsTo(Payment);

Order.belongsToMany(Product, { through: OrderLine });
Product.belongsToMany(Order, { through: OrderLine });

// Order.hasMany(OrderLine);
// OrderLine.belongsTo(Order);

// Product.hasMany(OrderLine);
// OrderLine.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderLine,
    Order,
    Address,
    Payment,
  },
};
