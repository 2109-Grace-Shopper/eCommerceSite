const router = require('express').Router();
const {
  models: {Address , User },
} = require('../db');
module.exports = router;

const {isAdminCheck} = require('./isAdmin')

// GET api/address
router.get('/', async function (req, res, next) {
    try {
        const user = await User.findByToken(req.header.authorization);
        const address = await Address.findOne({
            where: {
                id: user.id
            }
        })
        res.send(address)
    } catch (error) {
      next(error);
    }
});

//POST create shipping address associate with user
router.post('/address', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.header.authorization);
        const address = await Address.findOrCreate({
            where:{
                email: req.body.email,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
            }
        })
        await user.addAddress(address[0])
        res.send(address[0])
	} catch (error) {
		next(error);
	}
});

//PUT update address for user(user and admin can both modify it)
router.put('./address', async (req, res, next) => {
    try{
        const user = await User.findByToken(req.headers.authorization);
        const address = await Address.findOne({
            where: {
                id: user.id
            }
        })

        res.send(
            await address.update({
                email: req.body.email,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
        }))
    }catch(error){
        next(error)
    }
})

