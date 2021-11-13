// import axios from 'axios';

// //action type
// const GOT_CART_ITEMS = "GOT_CART_ITEMS";
// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// //action creator
// const getCartItems = (items) => ({
//     type: GOT_CART_ITEMS,
//     items
// })

// const addToCart = (qty) => ({
//     type: ADD_TO_CART,
//     qty
// })

// const removeFromCart = (item) => ({
//     type: REMOVE_FROM_CART,
//     item
// })

// //thunk
// export const getAllItems = (userId) => {
//     return async (dispatch) => {
//         try {
//             const {data} = await axios.get(`/api/carts/${userId}`);
//             dispatch(getCartItems(data.products));
//         } catch (error) {
//             console.log("Error in getAllItems thunk", error)
//         }
//     }
// }

// export const addCartItems = (userId, qty) => {
//     return async (dispatch) => {
//         try {
//             const {data} = await axios.post(`/api/carts`, {
//                 userId,
//                 qty
//               })
//             dispatch(addToCart(data));
//         } catch (error) {
//             console.log("Error in addCartItems thunk", error)
//         }
//     }
// }

// export const removeItems = (userId, itemId) => {
//     return async (dispatch) => {
//         try {
//             const {data} = await axios.delete(`/api/carts/${userId}/${itemId}`)
//             dispatch(removeFromCart(data));
//         } catch (error) {
//             console.log("Error in FetchProduct thunk", error)
//         }
//     }
//   };

// //reducer
// export default function singleProductReducer(state = [], action) {
//     switch (action.type) {
//         case GOT_CART_ITEMS:
//             return action.items;
//         case ADD_TO_CART:
//             return [...state];
//         case REMOVE_FROM_CART:{
//             const items = [...state].filter(
//                 item => item.id !== action.item.id
//               )
//               return items
//             }
//         default:
//             return state;
//     }
// }