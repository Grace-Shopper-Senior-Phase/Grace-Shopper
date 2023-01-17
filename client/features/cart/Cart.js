


import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { getCartAsync, selectCart, removeFromCartAsync } from './cartSlice'

import { selectProducts } from '../allproducts/productsSlice';
import { fetchProductsAsync } from '../allproducts/productsSlice';

import { selectMe } from '../auth/authSlice';


const Cart = () => {
  const me = useSelector(selectMe)
  const meId = me.id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(selectCart)
  const products = cart.products

  let totalMap;
  if(products && products.length){
  totalMap = products.map((product)=>{
    return product.price
  })
  }else{
    totalMap = []
  }
  let total = 0
  if(totalMap[0]){
  total = totalMap.reduce((a,b)=> a + b)
  }
  

  //  COULD USE COUNT MAGIC METHOD
  const getNumber = (productId)=>{
    const idArray = products.filter((product) => {
      return Number(product.id) === productId
    })
      return idArray.length
  }

  useEffect(() => {
    dispatch(getCartAsync(me.id))
  }, [dispatch] );
  

  const handleRemoveFromCart = (productId)=>{
    dispatch(removeFromCartAsync({productId, meId})).then(()=>{
      dispatch(getCartAsync(me.id))
    })
  }
  const handleNavigate = () =>{
    navigate('/checkout')
  }
 
 return (
  <div id="allProducts">
  <div>
    <h1>Your products</h1>
    <h1>TOTAL: {total}</h1>
      <ul className="media-list">
        {products && products.length ? 
          products.map((product) => (
            <div>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
            <p>Quantity: {getNumber(product.id)}</p>
            <button onClick={()=> handleRemoveFromCart(product.id)}>Delete From Cart</button>
            </div>
          )): ""}
      </ul>
    </div>
    <button onClick={handleNavigate}>Checkout</button>
</div>
 )
}
 
export default Cart

