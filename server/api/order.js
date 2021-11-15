const router = require('express').Router();
const {
  models: { Product, User, Order, OrderLine },
} = require('../db');
module.exports = router;

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

async function findOneOrderLine(orderId, productId) {
  try {
    const product = await OrderLine.findOne({
      where: {
        orderId,
        productId,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}

//GET api/order --- this gets all the products in the order
router.get('/', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let order = await findOrder(user.id);
    if (!order) {
      order = await Order.create({ userId: user.id });
    }
    const products = await findOrderLines(order.id);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST api/order --- this creates a new orderLine
router.post('/', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let order = await findOrder(user.id);
    if (!order) {
      order = await Order.create({ userId: user.id });
    }
    let orderLine = await OrderLine.findOne({
      where: { orderId: order.id, productId: req.body.productId },
    });
    if (!orderLine) {
      orderLine = await OrderLine.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
    } else {
      res.send(
        await orderLine.update({
          quantity: Number(orderLine.quantity) + Number(req.body.quantity),
        })
      );
    }
    res.send(orderLine);
  } catch (error) {
    next(error);
  }
});

// DELETE api/order --- this deletes an orderLine
router.delete('/', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await findOrder(user.id);
    const orderLine = await findOneOrderLine(order.id, req.body.productId);
    await orderLine.destroy();
    res.send(orderLine);
  } catch (error) {
    next(error);
  }
});
