import { Link } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div >
      <div >
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.id}`}>
        <p>{item.name}</p>
      </Link>
      <p>${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.id, e.target.value)}
      >
      </select>
      <button onClick={() => removeHandler(item.id)}>
        <DeleteForeverIcon/>
      </button>
    </div>
  );
};

export default CartItem;