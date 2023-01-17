import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";
import { selectMe } from "../auth/authSlice";
import { editCartAsync } from "../cart/cartSlice";


const AllProducts = () => {
  const products = useSelector(selectProducts);
  const me = useSelector(selectMe)
  const cartId = me.id
  
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    const id = product.id
    dispatch(editCartAsync({cartId, id}))
  };

  
  // const handleAddToCart = (product) => {

  //   const id = product.id
  
  //     dispatch(editCartAsync({cartId,  id})).then(()=>{
  //       dispatch(fetchProductsAsync());
  //     })
  //     console.log("ID",id)
  //   };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch] );

  return (
    <div id="allProducts">
      <ul>
        {products.map((product) => (
          <li>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
            <button onClick={() => handleAddToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default AllProducts
