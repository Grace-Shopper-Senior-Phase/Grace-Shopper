const router = require("express").Router();
module.exports = router;

const { models: {Product, Cart, User} } = require("../db");

// All products route
router.get("/", async (req, res, next) => {
  try {
    const products = await Cart.findAll({where : {userId : req.user.id}});
    res.send(products);
  } catch (error) {
    console.log("Error in all products route");
    next(error);
  }
});




const requireToken = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    // console.log("TOKEIN", token)
    const user = await User.findByToken(req.headers.authorization);
    console.log("usssseer", user)
    req.user = user;
    console.log("REQ>USER: ", user)
    next();
  } catch (ex) {
    next(ex);
  }
};


router.get('/:userId/cart', requireToken, async (req, res, next) => {
  console.log("HELLO FORM GET CART ROUTE", req.user.id)
  // const { userId } = req.params;
  //   console.log("HERE'S USER ID: ", userId)
  //   console.log("")
  try {
    // const { userId } = req.params;
    const userId = req.params
    // console.log("HERE DA USER ID: ", userId)
    if (req.user.id === +userId) {
      const notes = await Cart.findAll({
        where: { userId },
        attributes: ['text'],
      });
      res.send(notes);
    } else {
      next({ message: 'unauthorized' });
    }
  } catch (ex) {
    next(ex);
  }
});