import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";
import { deleteSingleProductAsync } from "../allproducts/productsSlice";
import AddProduct from "../allproducts/AddProduct";





const AllProductsAdmin = () => {
  const products = useSelector(selectProducts);


  const dispatch = useDispatch()

  const handleDelete = (productId) => {
    dispatch(deleteSingleProductAsync(productId)).then(()=>dispatch(fetchProductsAsync()))
  
  }


  useEffect(() => {
    dispatch(fetchProductsAsync());
  },[dispatch]);

  return (
    <div id="allProducts">
    <AddProduct />
      <ul>
        {products.map((product) => (
          <li>
            <Link to={`/admin/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
            <button onClick={() => handleDelete(product.id)}>Delete Product</button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default AllProductsAdmin
