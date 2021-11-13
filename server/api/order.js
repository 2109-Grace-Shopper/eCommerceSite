const router = require('express').Router();

const {
  models: { Product, User, Order, OrderLine},
} = require('../db');
module.exports = router;

async function findOrder(userId) {
    try {
        const order = await Order.findOne({
            where: {
                userId,
                status: 'in cart'
            }
        })
        return order;
    } catch (error) {
        console.log(error)
    }
}

async function findOrderLines(orderId){
    try {
       const products = await OrderLine.findAll({
           where: {
               orderId
           }
       })
       return products
    } catch (error) {
        console.log(error)
    }
}

//get api/order
router.get('/', async function (req, res, next) {
    try {
        const user = await User.findByToken(req.headers.authorization)
        let order = await findOrder(user.id)
        if (!order) {
            order = await Order.create({userId: user.id})
        }
        const products = findOrderLines(order.id);
        res.send(products);
    } catch (error) {
        next(error)
    }
})