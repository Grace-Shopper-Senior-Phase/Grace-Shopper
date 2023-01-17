import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin === true)
  console.log("IS ADMIN IN NAVBAR: ", isAdmin)
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1 className="text-white bg-black flex justify-center text-5xl p-7 brightness-50 italic">Grace Shopper</h1>
      <nav>
        {isLoggedIn && !isAdmin ? (
          <div className='flex justify-evenly'>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products">Products</Link>
            {/* <Route
          ro="/products"
          element={<AllProducts />} /> */}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : isAdmin ? 
    
        <div>
          {/* NEW COMMENT */}
        {/* The navbar will show these links after you log in */}
        
        {/* <Link to="/home">Home</Link> */}
        {/* CHANGE BELOW IF WANT ADMIN ACCESS TO ALLL PRODUCTS?CART */}
        {/* <Link to="/products">Products</Link> */}
        <Link to="/admin/products">Admin Products</Link>
        <Link to="admin/signupAdmin">Sign Up New Admin</Link> 
       
        <Link to="admin/users">Users</Link> 
        {/* <Route
      ro="/products"
      element={<AllProducts />} /> */}
        <button type="button" onClick={logoutAndRedirectHome}>
          Logout
        </button>
      </div>
        :
        (
          <div className='flex justify-evenly'>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/loginAdmin">Admin Login</Link>
            {/* <Link to="/signupAdmin">Sign Up as Admin</Link> */}
            <Link to="/products">View Products</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
