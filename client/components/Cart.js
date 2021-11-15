import { Link } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import CartItem from "./CartItem";
import {fetchItems, updateItem, removeItem} from '../store/order'

/**
 * COMPONENT
 */
 class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        qty: 1
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.qtyChangeHandler = this.qtyChangeHandler.bind(this)
      this.removeFromCartHandler = this.removeFromCartHandler.bind(this)
      this.getCartCount = this.getCartCount.bind(this)
      this.getCartTotal = this.getCartTotal.bind(this)
    }
  
    componentDidMount() {
      this.props.fetchItems();
    }

    qtyChangeHandler(event) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    handleSubmit(id, event) {
      event.preventDefault();
      this.props.updateItem(id, this.state.qty);
    }
  
    removeFromCartHandler(id) {
      this.props.removeItem(id)
    }

    getCartCount(cartItems){
        return cartItems.reduce((quantity, item) => Number(item.quantity) + quantity, 0);
    }

    getCartTotal (cartItems){
        return cartItems
          .reduce((subTotal, item) => subTotal+item.subTotal, 0);
      };
  
    render() {
      const cartItems = this.props.items;
      console.log(cartItems)

      return (
        <>
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/products">Go Back</Link>
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
                  <div >
                      <h3>Quantity</h3>
                  </div>
                  <div>
                      <h3>Delete</h3>
                  </div>
              </div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  qtyChangeHandler={this.qtyChangeHandler}
                  removeHandler={this.removeFromCartHandler}
                  handleSubmit={this.handleSubmit}
                />
              ))}
              </div>
            )}
          </div>
  
          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <div>
              <p> {this.getCartCount(cartItems)} items</p>
              </div>
              {cartItems.map((item) => (
                <div id="cart_subtotal">
                <p>{item.product.name}</p>
                <p>subTotal: ${item.subTotal}</p>
                </div>
              ))}
              <div id="cart_total">
              <p>Total: ${this.getCartTotal(cartItems)}</p>
              </div>
            </div>
            <div>
              <Link to="/checkout">
              <button>Proceed To Checkout</button>
              </Link>
            </div>
          </div>
        </div>
        </>
      );
    }
  }
  
  /**
   * CONTAINER
   */
  const mapState = (state) => {
    return { items: state.order };
  };
  
  const mapDispatch = (dispatch) => ({
    fetchItems: () => dispatch(fetchItems()),
    removeItem: (id) => dispatch(removeItem(id)),
    updateItem:(id, quantity) => dispatch(updateItem(id, quantity))
  });
  
  export default connect(mapState, mapDispatch)(Cart);
  