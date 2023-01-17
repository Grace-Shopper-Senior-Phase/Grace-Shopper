import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3 className="text-red-700">Welcome, {username}</h3>
    </div>
  );
};

export default Home;
