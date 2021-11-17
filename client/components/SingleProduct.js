import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
import { addItem } from '../store/order';
import Button from '@mui/material/Button';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      qty: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId;
      this.props.fetchProduct(productId);
    } catch (error) {
      console.error(error, 'error in component did mount single product');
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let guestOrderId = '';
    if (!window.localStorage.orderId) {
      guestOrderId = 0;
    } else {
      guestOrderId = window.localStorage.orderId;
    }
    this.props.addItem(
      Number(guestOrderId),
      this.props.match.params.productId,
      this.state.qty
    );
  }

  render() {
    const product = this.props.product;
    return (
      <div className="singleProductDiv">
        <img
          src={product.imageUrl}
          style={{ width: '150px', height: '150px' }}
        />
        <h1>{product.name}</h1>
        <h2>{product.category}</h2>
        <h2>
          <img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png" />
          {product.price}g
        </h2>
        <h2 className="singleProductDesc">{product.description}</h2>
        <form className="single_product_form" onSubmit={this.handleSubmit}>
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            onChange={this.handleChange}
            min="1"
            max="999"
            step="1"
            placeholder={this.state.qty}
            value={this.state.qty}
          />
          <Button variant="contained" type="submit">
            Add to Cart
          </Button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return { product: state.singleProduct };
};

const mapDispatch = (dispatch) => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
  addItem: (orderId, productId, quantity) =>
    dispatch(addItem(orderId, productId, quantity)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
