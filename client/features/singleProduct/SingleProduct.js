import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../singleProduct/singleProductSlice.js";
import { EditProduct } from "../singleProduct/EditProduct";

import { editCartAsync } from "../cart/cartSlice.js";

import { selectMe } from '../auth/authSlice';


const SingleProduct = () => {
  const { id } = useParams();
  
  const singleProduct = useSelector(selectSingleProduct);
  const me = useSelector(selectMe)
  console.log(" ME.if type: ",typeof me.id)

  const cartId = me.id
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const { name, price, description, imageUrl, quantity } =
    singleProduct.singleProduct;

  const handleAddToCart = () => {
    // dispatch(addToCart(id));
    
    dispatch(editCartAsync({cartId, id}))
    console.log("ID",id)
  };
return (
  <>
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
    <img className="w-1/3 h-full" src={imageUrl} />
    <div className="w-2/3 p-4 text-center">
      <h1 className="text-2xl font-medium">{name}</h1>
      <h2 className="text-lg font-medium text-green-500">${price}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-600">Quantity: {quantity}</p>
    </div>
    <div className="my-4">
      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600" onClick={() => handleAddToCart()}>Add to cart</button>
    </div>
  </div>
  </>
);

};

{
  /* isAdmin ?         <EditProduct />
        : null      </div>
    </div>
  );
}; */
}

export default SingleProduct;
