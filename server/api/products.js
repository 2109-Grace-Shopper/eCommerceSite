const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// GET api/products
router.get('/', async function (req, res, next) {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
