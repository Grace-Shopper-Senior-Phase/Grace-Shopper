import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/allproducts/productsSlice'
import product from "../features/singleProduct/singleProductSlice"
import usersReducer from '../features/usersadmin/usersSlice'
import singleUserReducer from '../features/usersadmin/singleUserSlice'
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: { auth: authReducer,
             products: productsReducer,
             singleProduct: product,
             users: usersReducer,
             singleUser: singleUserReducer,
            cart: cartReducer},

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



export default store;
export * from '../features/auth/authSlice';
