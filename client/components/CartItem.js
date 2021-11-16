import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { updateItem, removeItem } from '../store/order';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.item.quantity,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.qtyChangeHandler = this.qtyChangeHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }

  handleSubmit(id, event) {
    event.preventDefault();
    console.log('we updated!', this.state.quantity);
    this.props.updateItem(id, this.state.quantity);
  }

  qtyChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  removeHandler(productId) {
    this.props.removeItem(productId);
  }

  render() {
    const item = this.props.item;

    return (
      <div className="cartitem">
        <div className="cartitem__image">
          <img src={item.product.imageUrl} alt={item.product.name} />
        </div>
        <Link to={`/products/${item.productId}`} className="cartItem__name">
          <p>{item.product.name}</p>
        </Link>
        <p className="cartitem__price"><img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png" />{item.product.price}g</p>
        <form
          className="cartItem__select"
          onSubmit={(event) => this.handleSubmit(item.productId, event)}
        >
          <label htmlFor="quantity"></label>
          <input
            id="cart_input"
            type="number"
            name="quantity"
            onChange={(event) => this.qtyChangeHandler(event)}
            min="1"
            max="999"
            step="1"
            placeholder={item.quantity}
            value={this.state.quantity}
          />
          <Button size="small" variant="contained" type="submit">
            Update
          </Button>
        </form>
        <button
          className="cartItem__deleteBtn"
          onClick={() => this.removeHandler(item.productId)}
        >
          <DeleteIcon />
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  removeItem: (productId) => dispatch(removeItem(productId)),
  updateItem: (productId, quantity) =>
    dispatch(updateItem(productId, quantity)),
});

export default connect(null, mapDispatch)(CartItem);
