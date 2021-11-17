const router = require('express').Router();
const {
  models: { User },
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

// GET api/users ---- NEEDS ADMIN CHECK
router.get('/', isAdminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'avatar',
        'isAdmin',
      ],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// GET api/users/:userId ---- NEEDS ADMIN TOKEN
router.get('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId);
    res.send(users);
  } catch (error) {
    next(error);
  }
});
