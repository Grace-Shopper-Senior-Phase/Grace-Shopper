import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCartAsync, selectCart, removeFromCartAsync } from "./cartSlice";

import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";

import { selectMe } from "../auth/authSlice";

const Cart = () => {
  const me = useSelector(selectMe);
  const meId = me.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const products = cart.products;

  let totalMap;
  if (products && products.length) {
    totalMap = products.map((product) => {
      return product.price;
    });
  } else {
    totalMap = [];
  }
  let total = 0;
  if (totalMap[0]) {
    total = totalMap.reduce((a, b) => a + b);
  }

  //  COULD USE COUNT MAGIC METHOD
  const getNumber = (productId) => {
    const idArray = products.filter((product) => {
      return Number(product.id) === productId;
    });
    return idArray.length;
  };

  useEffect(() => {
    dispatch(getCartAsync(me.id));
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCartAsync({ productId, meId })).then(() => {
      dispatch(getCartAsync(me.id));
    });
  };
  const handleNavigate = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl text-center mb-6">Your products</h1>
      <h1 className="text-xl text-center mb-6">Total: {total}</h1>
      <div className="grid grid-cols-3 gap-4">
        {products && products.length
          ? products.map((product) => (
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link href={`/products/${product.id}`}>
                  <img className="w-full" src={product.imageUrl} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">${product.price}</p>
                  </div>
                </Link>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">
                    Quantity: {getNumber(product.id)}
                  </p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Delete From Cart
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
      <button
        className="bg-sky-400 text-white py-1.5 px-3 rounded-lg hover:bg-sky-600"
        onClick={handleNavigate}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;

// import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom"
// import { getCartAsync, selectCart, removeFromCartAsync } from './cartSlice'
// import { selectMe } from '../auth/authSlice';
// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'

// const Cart = () => {
//   const me = useSelector(selectMe)
//   const meId = me.id
//   const dispatch = useDispatch()
//   const cart = useSelector(selectCart)
//   const products = cart.products

//   let totalMap;
//   if(products && products.length){
//   totalMap = products.map((product)=>{
//     return product.price
//   })
//   }else{
//     totalMap = []
//   }
//   let total = 0
//   if(totalMap[0]){
//   total = totalMap.reduce((a,b)=> a + b)
//   }

//   //  COULD USE COUNT MAGIC METHOD
//   const getNumber = (productId)=>{
//     const idArray = products.filter((product) => {
//       return Number(product.id) === productId
//     })
//       return idArray.length
//   }

//   useEffect(() => {
//     dispatch(getCartAsync(me.id))
//   }, [dispatch] );

//   const handleRemoveFromCart = (productId)=>{
//     dispatch(removeFromCartAsync({productId, meId})).then(()=>{
//       dispatch(getCartAsync(me.id))
//     })
//   }
//   const [open, setOpen] = useState(true)

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-500"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-500"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-500 sm:duration-700"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-500"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
//                   <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                     <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
//                         <div className="ml-3 flex h-7 items-center">
//                           <button
//                             type="button"
//                             className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                             onClick={() => setOpen(false)}
//                           >
//                             <span className="sr-only">Close panel</span>
//                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>
//                       <div className="mt-8">
//                         <div className="flow-root">
//                           <ul role="list" className="-my-6 divide-y divide-gray-200">
//                             {products && products.length ?
//                               products.map((product) => (
//                                 <li key={product.id} className="flex py-6">
//                                   <Link to={`/products/${product.id}`}>
//                                     <img className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200" src={product.imageUrl} />
//                                     <div className="px-6 py-4">
//                                       <div className="font-bold text-xl mb-2">{product.name}</div>
//                                       <p className="text-gray-700 text-base">${product.price}</p>
//                                       <p className="text-gray-700 text-base">Quantity: {getNumber(product.id)}</p>
//                                     </div>
//                                   </Link>
//                                   <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=> handleRemoveFromCart(product.id)}>Delete From Cart</button>
//                                 </li>
//                               )): ""}
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center py-6">
//                         <p className="text-lg font-medium text-gray-900">Total: {total}</p>
//                         <button className="bg-sky-400 text-white py-1.5 px-3 rounded-lg hover:bg-sky-600">Checkout</button>
//                       </div>
//                     </div>
//                   </div>

//      </Dialog.Panel>
// </div>
// </div>
// </div>
// </div>
// </Transition.Child>
// </div>
// </Dialog>
// </Transition.Root>

//   )
// }
// export default Cart
