import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { fetchItems } from '../store/order';

const Navbar = (props) => {
  return (
    <div className="navbar">
      <h1>Pierre's General Store</h1>
      <nav>
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/products" className="navLink">
          Products
        </Link>
        <Link to="/about" className="navLink">
          About
        </Link>
        {props.isLoggedIn ? (
          <Link to="/profile" className="navLink">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="navLink">
            Login
          </Link>
        )}
        <Link to="/cart" className="navLink">
          <Badge badgeContent={10} color="error">
            <AddShoppingCart />
          </Badge> 
        </Link>
      </nav>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItems:() => dispatch(fetchItems()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
