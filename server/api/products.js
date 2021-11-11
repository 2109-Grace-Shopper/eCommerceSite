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

//get single product
router.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;

    const item = await Product.findByPk(id)
    if (item === null){
      res.send("I don't seem to have that item right now. Try next season! - Pierre")
    } else {
      res.json(item)
    }
  } catch(error){
    next(error)
  }
})

//edit product, will need to require admin token

router.put('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const productToUpdate = await Product.findByPk(id);
    res.send(await productToUpdate.update(req.body))

  }catch(error){
    next(error)
  }
})

//delete product, will need to require admin token

router.delete('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const productToDelete = await Product.findByPk(id);
    await productToDelete.destroy();
    res.send(productToDelete)
  }catch(error){
    next(error)
  }
})
