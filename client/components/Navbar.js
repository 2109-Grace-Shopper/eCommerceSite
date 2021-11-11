import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';;

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
    <h1>Pierre's General Store</h1>
    <nav>
      <Link to="/" className="navLink">
        Home
      </Link>
      <Link to="#" className="navLink">
        All Products
      </Link>
      <Link to="#" className="navLink">
        About
      </Link>
      {isLoggedIn ? (
        <Link to="#" className="navLink">
          Profile
        </Link>
      ) : (
        <Link to="/login" className="navLink">
          Login
        </Link>
      )}
      <Link to="#" className="navLink">
        <ShoppingCartIcon fontSize="middle"/>
      </Link>
    </nav>
  </div>
);

// Need to rework stuff below
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
