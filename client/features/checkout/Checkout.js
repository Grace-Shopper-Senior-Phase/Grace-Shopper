import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutAsync } from "./checkoutSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
   dispatch(checkoutAsync());
  alert('Your order is now being processed!')
  navigate('/products')
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <form>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Name on Card:
            <input
              className="form-input w-full"
              type="text"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Card Number:
            <input
              className="form-input w-full"
              type="number"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Expiration Date:
            <input
              className="form-input w-full"
              type="number"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            CVV:
            <input
              className="form-input w-full"
              type="number"
            />
          </label>
        </div>
        <button onClick={handleCheckout} className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
