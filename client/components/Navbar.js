import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems } from '../store/order';
import { AddShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';

class Navbar extends React.Component {
  componentDidMount() {
    const audio = document.getElementsByClassName('audio-element')[0];
    // audio.play()
    let guestOrderId = window.localStorage.orderId;
    this.props.fetchItems(Number(guestOrderId)); // Used to get number of unique items in the cart for badge icon
    // When a user logs in, they will also get a cart assigned
  }
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <h1>Pierre's General Store</h1>
        </Link>
        {/* <p>(Song: Stardew Valley Overture)</p>
        <audio className="audio-element">
          <source src="https://vgmsite.com/soundtracks/stardew-valley/jijokidi/01%20-%20Stardew%20Valley%20Overture.mp3" ></source>
        </audio>   */}
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
          {this.props.isLoggedIn ? (
            <Link to="/profile" className="navLink">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="navLink">
              Login
            </Link>
          )}
          <Link to="/cart" className="navLink">
            <Badge badgeContent={this.props.order.length} color="error">
              <AddShoppingCart />
            </Badge>
          </Link>
        </nav>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItems: (orderId) => dispatch(fetchItems(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
