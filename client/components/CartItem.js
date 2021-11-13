// import { Link } from "react-router-dom";
// import React from 'react';
// import { connect } from 'react-redux';

// const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
//   return (
//     <div >
//       <div >
//         <img src={item.imageUrl} alt={item.name} />
//       </div>
//       <Link to={`/product/${item.id}`} className="cartItem__name">
//         <p>{item.name}</p>
//       </Link>
//       <p>${item.price}</p>
//       <select
//         value={item.qty}
//         onChange={(e) => qtyChangeHandler(item.id, e.target.value)}
//       >
//         <option key={x + 1} value={x + 1}>
//         {x + 1}
//         </option>
//       </select>
//       <button onClick={() => removeHandler(item.id)}>
//         <i className="fas fa-trash"></i>
//       </button>
//     </div>
//   );
// };

// export default connect(mapState, mapDispatch)(CartItem);