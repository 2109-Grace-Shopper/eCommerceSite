const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

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
