import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";
import { selectMe } from "../auth/authSlice";
import { editCartAsync } from "../cart/cartSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);
  const me = useSelector(selectMe);
  const cartId = me.id;

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const id = product.id;
    dispatch(editCartAsync({ cartId, id }));
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div>
              <Link to={`/products/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageUrl}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>

                <h3 className="mt-4 text-base text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </Link>
              <button
                className="bg-sky-400/90 text-white py-1.5 px-3 rounded-lg hover:bg-sky-600"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
