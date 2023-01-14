const router = require('express').Router()
const { models: { User, Cart }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId,{include: Cart})
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const cart = await user.getCart()
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send( await user.destroy());
  } catch (error) {
    console.log("Error in delete user route");
    next(error);
  }
});
