import { Link } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const CartItem = (props) => {
  const {item, qtyChangeHandler, handleSubmit, removeHandler} = props;

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.product.imageUrl} alt={item.product.name} />
      </div>
      <Link to={`/products/${item.productId}`} className="cartItem__name">
        <p>{item.product.name}</p>
      </Link>
      <p className="cartitem__price">${item.product.price}</p>
      <form className="cartItem__select" onSubmit= {(e) => handleSubmit(item.productId, e)}>
          <label htmlFor="quantity"></label>
          <input
          id="cart_input"
            type="number"
            name="quantity"
            onChange={(e)=>qtyChangeHandler(e)}
            min="1"
            max="999"
            step="1"
            placeholder={item.quantity}
            value={props.qty}
          />
          <Button size="small" variant="contained" type="submit">
            update
          </Button>
        </form>
      <button className="cartItem__deleteBtn" onClick={() => removeHandler(item.productId)}>
        <DeleteIcon/>
      </button>
    </div>
  );
};

export default CartItem;