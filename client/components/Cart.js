// import { Link } from "react-router-dom";
// import React from 'react';
// import { connect } from 'react-redux';
// import CartItem from "./CartItem";

// /**
//  * COMPONENT
//  */
//  class Cart extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         qty: 1
//       }
//       this.qtyChangeHandler = this.qtyChangeHandler.bind(this)
//       this.removeFromCartHandler = this.removeFromCartHandler.bind(this)
//       this.getCartCount = this.getCartCount.bind(this)
//       this.getCartSubTotal = this.getCartSubTotal.bind(this)
//     }
  
//     componentDidMount() {
//         this.props.fetchCartItems();
//     }
  
//     qtyChangeHandler(id, qty) {
//         addToCart(id, qty);
//     }
  
//     removeFromCartHandler(id) {
//         removeFromCart(id)
//     }

//     getCartCount(cartItems){
//         return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
//     }

//     getCartSubTotal (cartItems){
//         return cartItems
//           .reduce((price, item) => price + item.price * item.qty, 0)
//           .toFixed(2);
//       };
  
//     render() {
//       const cartItems = this.props.cartItems;

//       return (
//         <div >
//           <div >
//             <h2>Shopping Cart</h2>
//             {cartItems.length === 0 ? (
//               <div>
//                 Your Cart Is Empty <Link to="/products">Go Back</Link>
//               </div>
//             ) : (
//               cartItems.map((item) => (
//                 <CartItem
//                   key={item.id}
//                   item={item}
//                   qtyChangeHandler={qtyChangeHandler}
//                   removeHandler={removeFromCartHandler}
//                 />
//               ))
//             )}
//           </div>
  
//           <div>
//             <div>
//               <p>Subtotal ({getCartCount()}) items</p>
//               <p>${getCartSubTotal()}</p>
//             </div>
//             <div>
//               <button>Proceed To Checkout</button>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
  
//   /**
//    * CONTAINER
//    */
//   const mapState = (state) => {
//     return { cartItems: state.cartItems };
//   };
  
//   const mapDispatch = (dispatch) => ({
//     fetchCartItems: () => dispatch(fetchCartItems()),
//     addToCart:(id, qty) => dispatch(addToCart(id, qty)),
//     removeFromCart: (id) => dispatch(removeFromCart(id))
//   });
  
//   export default connect(mapState, mapDispatch)(Cart);
  