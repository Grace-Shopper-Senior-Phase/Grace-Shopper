import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getCart,selectCart,getCart2 } from './cartSlice'

// import { selectProducts } from '../allproducts/productsSlice';
// import { fetchProductsAsync } from '../allproducts/productsSlice';



import { selectMe } from '../auth/authSlice';





const Cart = () => {

const me = useSelector(selectMe)
const dispatch = useDispatch()

const cart = useSelector(selectCart)
 const products = cart.products
 
useEffect(() => {
  dispatch(getCart2(me.id))
}, [dispatch] );

 

 
 return (
  <div id="allProducts">
  <div>
    <h1>Your products</h1>
      <ul className="media-list">
        {products && products.length ?
          products.map((product) => (
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
          )): ""}
      </ul>
    </div>
</div>
 )
}
 
export default Cart
