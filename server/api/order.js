const router = require('express').Router();
const {
  models: { User, Product, Order, OrderLine },
} = require('../db');
module.exports = router;

// HELPER FUNCTIONS:
// findOrder -- finds a user's active order
async function findOrder(userId) {
  try {
    const order = await Order.findOne({
      where: {
        userId,
        status: 'in cart',
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}

// findOrderLines -- finds all items within a specific order
async function findOrderLines(orderId) {
  try {
    const products = await OrderLine.findAll({
      where: {
        orderId,
      },
      include: Product,
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

// findOneOrderLine -- finds one specific item in a specific order
async function findOneOrderLine(orderId, productId) {
  try {
    const product = await OrderLine.findOne({
      where: {
        orderId,
        productId,
      },
      include: Product,
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}

// findProduct -- finds a specific product
async function findProduct(productId) {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    console.log(error);
  }
}

// ROUTES
// GET api/order --- this gets all the items in the order
router.get('/', async function (req, res, next) {
  try {
    // Finds user's order, if it doesn't exist, it creates one
    const user = await User.findByToken(req.headers.authorization);
    let order = await findOrder(user.id);
    if (!order) {
      order = await Order.create({ userId: user.id });
    }
    // Finds items in specific order and returns them
    const products = await findOrderLines(order.id);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST api/order --- this creates a new orderLine
router.post('/', async function (req, res, next) {
  try {
    // Finds user's order, if it doesn't exist, it creates one
    const user = await User.findByToken(req.headers.authorization);
    let order = await findOrder(user.id);
    if (!order) {
      order = await Order.create({ userId: user.id });
    }
    // Calculates subTotal for an item given its quantity
    const product_value = await findProduct(req.body.productId);
    const subTotal = Number(product_value.price) * Number(req.body.quantity);
    // Finds specific OrderLine and updates quantity/subTotal, if it doesn't exist, it creates one
    let orderLine = await findOneOrderLine(order.id, req.body.productId);
    if (!orderLine) {
      orderLine = await OrderLine.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        subTotal: subTotal,
      });
    } else {
      await orderLine.update({
        quantity: Number(orderLine.quantity) + Number(req.body.quantity),
        subTotal: subTotal + Number(orderLine.subTotal),
      });
    }
    res.send(await findOneOrderLine(order.id, req.body.productId));
  } catch (error) {
    next(error);
  }
});

// PUT api/order --- this updates an orderLine
router.put('/', async function (req, res, next) {
  try {
    // Finds user's order
    const user = await User.findByToken(req.headers.authorization);
    const order = await findOrder(user.id);
    // Calculates subTotal for an item given its quantity
    const product_value = await findProduct(req.body.productId);
    const subTotal = Number(product_value.price) * Number(req.body.quantity);
    // Updates an orderLine with new quantity/subTotal
    const orderLine = await findOneOrderLine(order.id, req.body.productId);
    res.send(
      await orderLine.update({
        quantity: Number(req.body.quantity),
        subTotal: subTotal,
      })
    );
  } catch (error) {
    next(error);
  }
});

// DELETE api/order --- this deletes an orderLine
router.delete('/', async function (req, res, next) {
  try {
    // Finds specific orderLine in user's order and deletes it
    const user = await User.findByToken(req.headers.authorization);
    const order = await findOrder(user.id);
    const orderLine = await findOneOrderLine(order.id, req.body.productId);
    await orderLine.destroy();
    res.send(orderLine);
  } catch (error) {
    next(error);
  }
});
