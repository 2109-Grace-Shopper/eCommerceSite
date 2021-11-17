const {
    models: { User },
  } = require('../db');

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


module.exports = {
    isAdminCheck
}