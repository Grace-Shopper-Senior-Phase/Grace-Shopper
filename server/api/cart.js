const router = require("express").Router();
module.exports = router;

const {
  models: { Product, Cart, User },
} = require("../db");

// All products route
router.get("/", async (req, res, next) => {
  try {
    const products = await Cart.findAll({ where: { userId: req.user.id } });
    res.send(products);
  } catch (error) {
    console.log("Error in all products route");
    next(error);
  }
});

router.delete("/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(await cart.destroy());
  } catch (error) {
    console.log("Error in delete cart route");
    next(error);
  }
});

router.put("/:cartId/:productId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    console.log("CART IM ADD TO CART ROUTE: ", cart)
    const product = await Product.findByPk(req.params.productId)
    console.log("Product IM ADD TO CART ROUTE: ", product)
    await cart.addProduct(product)
    
    // res.send(await cart.update(req.body));
  } catch (error) {
    console.log("Error in update cart route");
    next(error);
  }
});

router.put("/:cartId", async (req, res, next) => {
  try {
    console.log("REQ.BODY: ", req.body)
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(await cart.addProduct(req.body.id));
  } catch (error) {
    console.log("Error in update cart route");
    next(error);
  }
});


router.get("/:id/cart", async (req, res, next) => {
  try {
    const products = await Cart.findByPk(req.params.id, { include: Product});
    res.send(products);
  } catch (error) {
    console.log("Error in all products route");
    next(error);
  }
});


// const requireToken = async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization;
//     // console.log("TOKEIN", token)
//     const user = await User.findByToken(req.headers.authorization);
//     console.log("usssseer", user)
//     req.user = user;
//     console.log("REQ>USER: ", user)
//     next();
//   } catch (ex) {
//     next(ex);
//   }
// };

// router.get('/:userId/cart', async (req, res, next) => {
//   console.log("HELLO FORM GET CART ROUTE", req.user.id)
//   // const { userId } = req.params;
//   //   console.log("HERE'S USER ID: ", userId)
//   //   console.log("")
//   // try {
//   //   // const { userId } = req.params;
//   //   const userId = req.params
//   //   // console.log("HERE DA USER ID: ", userId)
//   //   if (req.user.id === +userId) {
//   //     const notes = await Cart.findAll({
//   //       where: { userId },
//   //       attributes: ['text'],
//   //     });
//   //     res.send(notes);
//   //   } else {
//   //     next({ message: 'unauthorized' });
//   //   }
//   // } catch (ex) {
//   //   next(ex);
//   // }
// });
