const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

//GET all users
//api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'avatar', 'isAdmin']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

//GET single user
//api/users/1
router.get('/:userId', async (req, res, next) => {
  try {
      const users = await User.findByPk(req.params.userId)
      res.send(users)
  }
  catch(error) {
      next(error)
  }
})