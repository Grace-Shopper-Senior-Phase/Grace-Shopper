//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require ('./models/Product')
const Cart = require ('./models/Cart')

Cart.belongsTo(User)
User.hasOne(Cart)

Product.belongsToMany(Cart, {through: 'CartProduct'})
Cart.belongsToMany(Product, {through: 'CartProduct'})

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
}

