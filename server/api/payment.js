const router = require('express').Router();
const {
  models: {Payment , User },
} = require('../db');
module.exports = router;

const {isAdminCheck} = require('./isAdmin')

// GET api/address
router.get('/', async function (req, res, next) {
    try {
        const user = await User.findByToken(req.header.authorization);
        const payment = await Payment.findOne({
            where: {
                id: user.id
            }
        })
        res.send(payment)
    } catch (error) {
      next(error);
    }
});

//POST create shipping address associate with user
router.post('/address', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.header.authorization);
        const payment = await Payment.findOrCreate({
            where:{
                type: req.body.type,
                name: req.body.name,
                number: req.body.number,
                cvc: req.body.cvc,
                expDate: req.body.expDate
            }
        })
        await user.addPayment(payment[0])
        res.send(payment[0])
	} catch (error) {
		next(error);
	}
});

//PUT update address for user(user and admin can both modify it)
router.put('./address', async (req, res, next) => {
    try{
        const user = await User.findByToken(req.headers.authorization);
        const payment = await Payment.findOne({
            where: {
                id: user.id
            }
        })
        res.send(
            await payment.update({
                type: req.body.type,
                name: req.body.name,
                number: req.body.number,
                cvc: req.body.cvc,
                expDate: req.body.expDate
        }))
    }catch(error){
        next(error)
    }
})

