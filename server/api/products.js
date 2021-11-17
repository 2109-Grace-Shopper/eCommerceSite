const router = require('express').Router();
const {
  models: { Product, User },
} = require('../db');
module.exports = router;

const isAdminCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      next();
    } else {
      throw new Error("Get out of here, Morris! You're not allowed!");
    }
  } catch (error) {
    next(error);
  }
};

// GET api/products
router.get('/', async function (req, res, next) {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST api/products ---- NEEDS ADMIN TOKEN
router.post('/', isAdminCheck, async function (req, res, next) {
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

// PUT api/product/:id ---- NEEDS ADMIN TOKEN
router.put('/:id', isAdminCheck, async (req, res, next) => {
  try {
    const id = req.params.id;
    const productToUpdate = await Product.findByPk(id);
    res.send(await productToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE api/product/:id ---- NEEDS ADMIN TOKEN
router.delete('/:id', isAdminCheck, async (req, res, next) => {
  try {
    const id = req.params.id;
    const productToDelete = await Product.findByPk(id);
    await productToDelete.destroy();
    res.send(productToDelete);
  } catch (error) {
    next(error);
  }
});
