import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getCart,selectCart } from './cartSlice'

import { selectProducts } from '../allproducts/productsSlice';
import { fetchProductsAsync } from '../allproducts/productsSlice';


const Cart = () => {
 
const products = useSelector(selectProducts);

const dispatch = useDispatch()
const {id} = useParams()
console.log("ID: ", id)

useEffect(() => {
  dispatch(fetchProductsAsync()).then(()=>{
    dispatch(getCart(1))
  });
}, [dispatch] );
 
 
 return (
  <div id="allProducts">

  <div>
    <h1>Your products</h1>
      <ul className="media-list">
        {products.filter((product) => product.cartId === 1)
          .map((product) => (
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
          ))}
      </ul>
      

    </div>

</div>
 )
}
 
export default Cart