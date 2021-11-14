import { Link } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import CartItem from "./CartItem";
import {fetchItems, addItem, removeItem} from '../store/order'

/**
 * COMPONENT
 */
 class Cart extends React.Component {
    constructor() {
      super();
      this.state = {
        quantity: 1
      }
      this.qtyChangeHandler = this.qtyChangeHandler.bind(this)
      this.removeFromCartHandler = this.removeFromCartHandler.bind(this)
      this.getCartCount = this.getCartCount.bind(this)
      this.getCartSubTotal = this.getCartSubTotal.bind(this)
    }
  
    componentDidMount() {
        fetchItems();
        console.log(this.props.fetchItems());
    }
  
    qtyChangeHandler(id, quantity) {
        addItem(id, quantity);
        this.setState({
          quantity
        })
    }
  
    removeFromCartHandler(id) {
        removeItem(id)
    }

    getCartCount(cartItems){
        return cartItems.reduce((quantity, item) => Number(item.quantity) + quantity, 0);
    }

    getCartSubTotal (cartItems){
        return cartItems
          .reduce((price, item) => price + item.price * item.quantity, 0);
      };
  
    render() {
      // const cartItems = this.props.cartItems;
      // console.log(cartItems)

      const cartItems = [
        {
          id: 1,
          quantity: 5,
          name: 'Artichoke Seeds',
          category: 'seeds',
          price: 30,
          description: 'Plant these in the fall. Takes 8 days to mature.',
          imageUrl:
            'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/products/Artichoke_Seeds.png',
        },
        {
          id: 2,
          quantity: 5,
          name: 'Jack-O-Lantern',
          category: 'seasonal decor',
          price: 750,
          description: 'A whimsical fall decoration.',
          imageUrl:
            'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/products/Jack-O-Lantern.png',
        },
        {
          id: 3,
          quantity: 5,
          name: 'Rarecrow 2',
          category: 'seasonal decor',
          price: 5000,
          description: 'One of 8 special scarecrows. Collect them all!',
          imageUrl:
            'https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/products/36px-Rarecrow_2.png',
        }
      ]

      return (
        <div >
          <div >
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/products">Go Back</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  qtyChangeHandler={this.props.qtyChangeHandler}
                  removeHandler={this.props.removeFromCartHandler}
                />
              ))
            )}
          </div>
  
          <div>
            <div>
              <p>Subtotal ({this.getCartCount(cartItems)}) items</p>
              <p>${this.getCartSubTotal(cartItems)}</p>
            </div>
            <div>
              <button>Proceed To Checkout</button>
            </div>
          </div>
        </div>
      );
    }
  }
  
  /**
   * CONTAINER
   */
  const mapState = (state) => {
    return { cartItems: state.items };
  };
  
  const mapDispatch = (dispatch) => ({
    fetchItems: () => dispatch(fetchItems()),
    addItem:(id, qty) => dispatch(addItem(id, qty)),
    removeItem: (id) => dispatch(removeItem(id))
  });
  
  export default connect(mapState, mapDispatch)(Cart);
  