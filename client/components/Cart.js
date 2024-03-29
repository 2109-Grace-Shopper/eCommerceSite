import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems, updateItem, removeItem } from '../store/order';
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.getCartCount = this.getCartCount.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
  }

  componentDidMount() {
    let guestOrderId = window.localStorage.orderId;
    this.props.fetchItems(Number(guestOrderId));
  }

  getCartCount(cartItems) {
    return cartItems.reduce(
      (quantity, item) => Number(item.quantity) + quantity,
      0
    );
  }

  getCartTotal(cartItems) {
    return cartItems.reduce((subTotal, item) => subTotal + item.subTotal, 0);
  }

  render() {
    const cartItems = this.props.items;
    return (
      <>
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty
                <br />
                <Link to="/products">Go Back</Link>
              </div>
            ) : (
              <div>
                <div className="cartitem" id="cart_title">
                  <div>
                    <h3>Product</h3>
                  </div>
                  <div>
                    <h3>Name</h3>
                  </div>
                  <div>
                    <h3>Price</h3>
                  </div>
                  <div>
                    <h3>Quantity</h3>
                  </div>
                  <div>
                    <h3>Delete</h3>
                  </div>
                </div>
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} /> // attributes of the item available at this.props.item
                ))}
              </div>
            )}
          </div>

          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <div>
                <p>{this.getCartCount(cartItems)} items</p>
              </div>
              {cartItems.map((item) => (
                <div id="cart_subtotal" key={item.product.id}>
                  <p>{item.product.name}</p>
                  <p>
                    <img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png" />
                    {item.subTotal}g
                  </p>
                </div>
              ))}
              <div id="cart_total">
                <p>Total: {this.getCartTotal(cartItems)}g</p>
              </div>
            </div>
            {cartItems.length === 0 ? (
              <div />
            ) : (
              <div>
                <Link to="/checkout">
                  <button>Proceed To Checkout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return { items: state.order };
};

const mapDispatch = (dispatch) => ({
  fetchItems: (orderId) => dispatch(fetchItems(orderId)),
});

export default connect(mapState, mapDispatch)(Cart);
