const router = require('express').Router();
const {
  models: { Product, Order, OrderLine },
} = require('../db');
module.exports = router;

// HELPER FUNCTIONS:
// findOrder -- finds an active order
async function findOrder(orderId) {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
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
// POST api/guest/order --- this gets all the items in the order, needs to be POST route since orderId needs to be sent in a body, but function as a GET request
router.post('/order', async function (req, res, next) {
  try {
    let order = await Order.findByPk(req.body.orderId); // Finds the order by orderId
    // Finds items in specific order and returns them
    const products = await findOrderLines(order.id);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST api/guest --- this creates a new orderLine, triggers when guest clicks 'add to cart'
router.post('/', async function (req, res, next) {
  try {
    let order = await findOrder(req.body.orderId);
    if (!order) {
      // If order doesn't exist, it creates one
      order = await Order.create();
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
    const newItem = await findOneOrderLine(order.id, req.body.productId);
    res.send(newItem);
  } catch (error) {
    next(error);
  }
});

// PUT api/guest --- this updates an orderLine
router.put('/', async function (req, res, next) {
  try {
    // Finds user's order by orderId
    const order = await findOrder(req.body.orderId);
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

// DELETE api/guest --- this deletes an orderLine
router.delete('/', async function (req, res, next) {
  try {
    // Finds specific orderLine in guest order (using order's ID and product's ID) and deletes it
    const order = await findOrder(req.body.orderId);
    const orderLine = await findOneOrderLine(order.id, req.body.productId);
    await orderLine.destroy();
    res.send(orderLine); // Returning destroyed orderline -- this is important b/c we need to update it in our redux store
  } catch (error) {
    next(error);
  }
});

// PUT api/guest/confirm --- this updates order status to 'completed'
router.put('/confirm', async function (req, res, next) {
  try {
    const order = await findOrder(req.body.orderId);
    const orderLines = await findOrderLines(order.id);
    const total = orderLines.reduce((price, item) => price + item.subTotal, 0);
    res.send(await order.update({ status: 'completed', total: total }));
  } catch (error) {
    next(error);
  }
});
