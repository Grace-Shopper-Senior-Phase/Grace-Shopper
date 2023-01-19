import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../singleProduct/singleProductSlice.js";
import { EditProduct } from "../singleProduct/EditProduct";

import { editCartAsync } from "../cart/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { selectMe } from "../auth/authSlice";
import { addToCart } from "../cart/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();

  const singleProduct = useSelector(selectSingleProduct);
  const me = useSelector(selectMe);
  console.log(" ME.if type: ", typeof me.id);

  const cartId = me.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    navigate(`/product/${id}`)
  }, [dispatch]);

  const { name, price, description, imageUrl, quantity } =
    singleProduct.singleProduct;

  const handleAddToCart = () => {
    dispatch(addToCart(id));

    dispatch(editCartAsync({ cartId, id }));
    console.log("ID", id);
  };
  return (
    <div className="flex justify-center items-center min-h-screen-80 overflow-hidden">
  <div className="bg-white text-center">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

      <div className="flex">
        <div className="w-3/4">
          <img
            src={imageUrl}
            alt={name}
            className="w-3/4 h-64 object-cover rounded-lg group-hover:opacity-75"
          />
        </div>
        <div className="w-2/3 pl-4">
          <h3 className="mt-1 text-xl text-gray-1000">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-800">${price}</p>
          <p className="mt-2 text-sm font-medium text-gray-800">
            {description}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-700">{quantity}</p>
          <button
            className="bg-sky-400 text-white py-1.5 px-3 rounded-lg hover:bg-sky-600"
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
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
