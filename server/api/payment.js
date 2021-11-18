const router = require('express').Router();
const {
  models: { Payment, User, Order },
} = require('../db');
module.exports = router;

// GET api/payment --- gets payment method for specific user
router.get('/', async function (req, res, next) {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const payment = await Payment.findOne({
      where: {
        userId: user.id,
      },
    });
    res.send(payment);
  } catch (error) {
    next(error);
  }
});

// POST api/payment --- create payment method for a logged-in user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const payment = await Payment.create({
      type: req.body.type,
      name: req.body.name,
      number: req.body.number,
      cvc: req.body.cvc,
      expDate: req.body.expDate,
    });
    await user.setPayment(payment);
    res.send(payment);
  } catch (error) {
    next(error);
  }
});

// POST api/payment/guest --- creates payment method for guest user
router.post('/guest', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    if (order.paymentId) {
      const payment = await Payment.findByPk(order.paymentId);
      res.send(
        await payment.update({
          type: req.body.payment.type,
          name: req.body.payment.name,
          number: req.body.payment.number,
          cvc: req.body.payment.cvc,
          expDate: req.body.payment.expDate,
        })
      );
    } else {
      const payment = await Payment.create({
        type: req.body.payment.type,
        name: req.body.payment.name,
        number: req.body.payment.number,
        cvc: req.body.payment.cvc,
        expDate: req.body.payment.expDate,
      });
      await order.setPayment(payment);
      res.send(payment);
    }
  } catch (error) {
    next(error);
  }
});

//PUT api/payment --- updates payment for logged in user
router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const payment = await Payment.findOne({
      where: {
        userId: user.id,
      },
    });
    res.send(
      await payment.update({
        type: req.body.type,
        name: req.body.name,
        number: req.body.number,
        cvc: req.body.cvc,
        expDate: req.body.expDate,
      })
    );
  } catch (error) {
    next(error);
  }
});

//PUT api/payment/guest --- updates payment for guest user
router.put('/guest', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    const payment = await order.getPayment();
    res.send(
      await payment.update({
        type: req.body.payment.type,
        name: req.body.payment.name,
        number: req.body.payment.number,
        cvc: req.body.payment.cvc,
        expDate: req.body.payment.expDate,
      })
    );
  } catch (error) {
    next(error);
  }
});
