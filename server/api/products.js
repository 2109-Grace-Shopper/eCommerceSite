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

// POST api/products ---- WILL NEED ADMIN TOKEN
router.post('/', async function (req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//GET api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findByPk(id);
    if (item === null) {
      res.send(
        "I don't seem to have that item right now. Try next season! - Pierre"
      );
    } else {
      res.json(item);
    }
  } catch (error) {
    next(error);
  }
});

// PUT api/product/:id ---- WILL NEED ADMIN TOKEN
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const productToUpdate = await Product.findByPk(id);
    res.send(await productToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE api/product/:id ---- WILL NEED ADMIN TOKEN
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const productToDelete = await Product.findByPk(id);
    await productToDelete.destroy();
    res.send(productToDelete);
  } catch (error) {
    next(error);
  }
});
