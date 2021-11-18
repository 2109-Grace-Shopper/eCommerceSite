import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id="notFound">
      <h3>Oh no! I'm not sure what you're looking for!</h3>
      <h3>I might not have it this season, but in the mean time,</h3>
      <h3>why don't you take a look at what I have in store</h3>
      <br />
      <Link to="/products">
        <h1>Pierre's General Store</h1>
        <img
          src="https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/Pierres_shop_fall.png"
          width="400px"
          height="300px"
        />
      </Link>
    </div>
  );
};

export default NotFound;
