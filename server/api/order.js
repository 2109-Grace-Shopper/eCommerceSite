const router = require('express').Router();
const {
  models: { User, Product, Order, OrderLine },
} = require('../db');
module.exports = router;

// HELPER FUNCTIONS:
// findOrder -- finds a user's active order using userId
async function findOrder(userId) {
  try {
    const order = await Order.findOne({
      where: {
        userId,
        status: 'in cart', // one of the ENUMS (others are pending and completed)
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}

// findOrderLines -- finds all items within a specific order using orderId
async function findOrderLines(orderId) {
  try {
    const products = await OrderLine.findAll({
      where: {
        orderId,
      },
      include: Product, // Need super associations to do eager loading here (cannot be with a through table, need a direct relationship)
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

// findOneOrderLine -- finds one specific item in a specific order using orderId and productId
async function findOneOrderLine(orderId, productId) {
  try {
    const product = await OrderLine.findOne({
      where: {
        orderId,
        productId,
      },
      include: Product, // Similar here, we need super associations
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}

// findProduct -- finds a specific product using the PK
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
    const user = await User.findByToken(req.headers.authorization); // Find the user findByToken
    let order = await findOrder(user.id); // Find the specific order using the helper function
    if (!order) {
      // Creates order with default 'in cart' status if it can't find one
      order = await Order.create({ userId: user.id });
    }
    // Finds items in specific order using order's ID and returns them -- will be empty if nothing in cart
    const products = await findOrderLines(order.id);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST api/order --- this creates a new orderLine
router.post('/', async function (req, res, next) {
  try {
    // Finds user's order using their token, it it doesn't exist, it creates one
    const user = await User.findByToken(req.headers.authorization);
    let order = await findOrder(user.id);
    if (!order) {
      order = await Order.create({ userId: user.id });
    }
    // Calculates subTotal for an item given its quantity
    const product_value = await findProduct(req.body.productId);
    const subTotal = Number(product_value.price) * Number(req.body.quantity);

    let orderLine = await findOneOrderLine(order.id, req.body.productId);
    if (!orderLine) {
      // First case creates an orderLine if it can't find one
      orderLine = await OrderLine.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        subTotal: subTotal,
      });
    } else {
      // Second case updates an orderline's quantity/subTotal if it already exists
      await orderLine.update({
        quantity: Number(orderLine.quantity) + Number(req.body.quantity), // Need to parse them as numbers
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
    // Finds specific orderLine in user's order (using order's ID and product's ID) and deletes it
    const user = await User.findByToken(req.headers.authorization);
    const order = await findOrder(user.id);
    const orderLine = await findOneOrderLine(order.id, req.body.productId);
    await orderLine.destroy();
    res.send(orderLine); // Returning destroyed orderline -- this is important b/c we need to update it in our redux store
  } catch (error) {
    next(error);
  }
});

// PUT api/order/confirm --- this updates order status to 'completed'
router.put('/confirm', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await findOrder(user.id);
    const orderLines = await findOrderLines(order.id);
    const total = orderLines.reduce((price, item) => price + item.subTotal, 0);
    res.send(await order.update({ status: 'completed', total: total }));
  } catch (error) {
    next(error);
  }
});

// HELPER FUNCTION
// getPreviousOrders -- this gets a user's completed orders
async function getPreviousOrders(userId) {
  try {
    const orders = await Order.findAll({
      where: {
        userId,
        status: 'completed',
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
}

// GET api/order/history --- this gets a specific user's completed orders
router.get('/history', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await getPreviousOrders(user.id);
    // This loop adds product information necessary to populate order history
    for (let i = 0; i < orders.length; i++) {
      const orderLines = await findOrderLines(orders[i].id);
      orders[i] = orderLines;
    }
    res.send(orders);
  } catch (error) {
    next(error);
  }
});
