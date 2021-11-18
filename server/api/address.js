const router = require('express').Router();
const {
  models: { Address, User, Order },
} = require('../db');
module.exports = router;

// GET api/address --- gets address for specific user
router.get('/', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const address = await Address.findOne({
      where: {
        userId: user.id,
      },
    });
    res.send(address);
  } catch (error) {
    next(error);
  }
});

//POST api/address --- creates shipping address for a logged-in user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const address = await Address.create({
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });
    await user.setAddress(address);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

// POST api/address/guest --- creates shipping address for guest user
router.post('/guest', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    if (order.addressId) {
      const address = await Address.findByPk(order.addressId);
      res.send(
        await address.update({
          email: req.body.address.email,
          street: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          zipCode: req.body.address.zipCode,
        })
      );
    } else {
      const address = await Address.create({
        email: req.body.address.email,
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode,
      });
      await order.setAddress(address);
      res.send(address);
    }
  } catch (error) {
    next(error);
  }
});

// PUT api/payment --- updates address for logged in user
router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const address = await Address.findOne({
      where: {
        userId: user.id,
      },
    });
    res.send(
      await address.update({
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
      })
    );
  } catch (error) {
    next(error);
  }
});

// PUT api/payment/guest --- updates payment for guest user
router.put('/guest', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    const address = await order.getAddress();
    res.send(
      await address.update({
        email: req.body.address.email,
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode,
      })
    );
  } catch (error) {
    next(error);
  }
});
