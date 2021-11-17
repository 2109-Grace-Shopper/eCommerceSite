const router = require('express').Router();
const {
  models: { Product, Order, OrderLine },
} = require('../db');
module.exports = router;

// HELPER FUNCTIONS:
// findOrder -- finds an active order
async function findOrder(orderId) {
  try {
    const order = await Order.findOne({ /// find the one specific order that is in the cart and going to return it
      where: {
        id: orderId,
        status: 'in cart', ///here we have an ENUM that has in cart, pending or completed
      },
    });
    console.log(order)
    return order;
  } catch (error) {
    console.log(error);
  }
}

// findOrderLines -- finds all items within a specific order
async function findOrderLines(orderId) { ///finding the order lines given an order. so now you have a users order and want to find all the products in the order
  try {
    const products = await OrderLine.findAll({
      where: {
        orderId,
      },
      include: Product, ///here is where we needed the extra associations bc in order to include or do eager loading it can't be using a through table it has to be direct relationship
    });                 ///so this will include all the product information and then we return the product
    return products;
  } catch (error) {
    console.log(error);
  }
}

// findOneOrderLine -- finds one specific item in a specific order
async function findOneOrderLine(orderId, productId) {
  try {
    const product = await OrderLine.findOne({ /// finding a specific orderline given an orderId and productId
      where: {
        orderId,
        productId,
      },
      include: Product, ///similar here we are using the extra associations
    });
    return product; ///then it will return the product
  } catch (error) {
    console.log(error);
  }
}

// findProduct -- finds a specific product
async function findProduct(productId) {       /// we are finding the product based on the product id using the findBy primary key and returning the product
  try {
    const product = await Product.findByPk(productId); 
    return product;
  } catch (error) {
    console.log(error);
  }
}

// ROUTES
// GET api/guest --- this gets all the items in the order, triggers when guest clicks cart icon
router.post('/order', async function (req, res, next) {       /// Getting the order and getting all the products in that order
  try {
    let order = await Order.findByPk(req.body.orderId);
     /// find the specific order using the helper function we defined above
    // Finds items in specific order and returns them
    console.log("this is req.body", req.body)
    console.log(order)
    const products = await findOrderLines(order.id);  /// then we find all the products within the order
    res.send(products);                               /// if an order already exists then it will return all the products within that order and send those back
  } catch (error) {
    next(error);
  }
});

// POST api/guest --- this creates a new orderLine triggers when guest clicks add to cart
router.post('/', async function (req, res, next) {
  try {
     /// similar here we are finding the order
    let order = await findOrder(req.body.orderId);                           //
    if (!order) {                                                   /// if they don't have an order then we are creating one
      order = await Order.create();
    }
    const product_value = await findProduct(req.body.productId);
    const subTotal = Number(product_value.price) * Number(req.body.quantity);
    let orderLine = await findOneOrderLine(order.id, req.body.productId);
    if (!orderLine) {                                   ///then we are finding the particular oderline and if there is not an orderline we are creating one 
      orderLine = await OrderLine.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        subTotal: subTotal,
      });
    } else {
      await orderLine.update({                          /// here we are updating quantity and subtotal instead of creating a new orderline each time
        quantity: Number(orderLine.quantity) + Number(req.body.quantity), //parsing as a number then adding together
        subTotal: subTotal + Number(orderLine.subTotal),
      });
    }
    const newItem = await findOneOrderLine(order.id, req.body.productId)
    res.send(newItem);
  } catch (error) {
    next(error);
  }
});

// PUT api/order --- this updates an orderLine
router.put('/', async function (req, res, next) {
  try {
     ///finding the order
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

// DELETE api/order --- this deletes an orderLine
router.delete('/', async function (req, res, next) {
  try {
    // Finds specific orderLine in guest order and deletes it
    const order = await findOrder(req.body.orderId);
    const orderLine = await findOneOrderLine(order.id, req.body.productId); ///finding the one orderline associated with that orderId and productId 
    await orderLine.destroy();                                              ///and destroying it
    res.send(orderLine);  ///returning the orderline that we destroyed, this is important bc we need to update it in our store and tell it which orderline to destroy
  } catch (error) {
    next(error);
  }
});

// PUT api/order/confirm --- this updates order status to 'completed'
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
