import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import  Home  from '../home/Home';
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  
  const notLoggedIn = useSelector((state) => !!state.auth.me);


  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin === true)



  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <>
    <a className="p-4 flex justify-center -mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray" href='/'>Home</a>  
    {!isLoggedIn || (isLoggedIn && isAdmin) ? (
    <div className="w-full h-full flex justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} name={name}>
        <div>
          <label className='flex justify-center' htmlFor="username">
            <small>Username</small>
          </label>
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-3 text-gray-700 focus:outline-none focus:bg-white" name="username" type="text" />
        </div>
        <div>
          <label className='flex justify-center' htmlFor="password">
            <small>Password</small>
          </label>
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-3 text-gray-700 focus:outline-none focus:bg-white" name="password" type="password" />
        </div>
        <div className="p-4 flex justify-center">
          <button type="submit">{displayName}</button>
        </div>
      
      </form>
    </div> ) : <Home />}
    </>
  );
};

export default AuthForm;
