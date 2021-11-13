import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';
import Button from '@mui/material/Button';

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      qty: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  }

  render() {
    const product = this.props.product;
    console.log(this.props, 'this is props');
    console.log(this.state, "this is the state")
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

          {/* Insert add to cart button, and increment/decrement buttons here for quantity */}
          {/* Need to come back and try to get this working with material ui */}
          {/* <InputLabel id="selectQty">1</InputLabel>
          <Select labelId="selectQty"
            id="selectQty"
            value={this.state.qty}
            /> */}
            <form className="single_product_form" onSubmit={this.handleSubmit}>
              <label htmlFor="qty" >Quantity</label>
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
              <Button variant="contained"> Add to Cart</Button> 
            </form>
        </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return { product: state.singleProduct };
};

const mapDispatch = (dispatch) => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
