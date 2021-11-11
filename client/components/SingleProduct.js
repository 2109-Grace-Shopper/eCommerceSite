import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../store/singleProduct';

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId;
      this.props.fetchProduct(productId);
    } catch (error) {
      console.error(error, 'error in component did mount single product');
    }
  }

  render() {
    const product = this.props.product;
    console.log(this.props, "this is props")
    console.log(product, "this is product")
    return (
      <div>
         <img
          src={product.imageUrl}
          style={{ width: '200px', height: '200px' }}
        />
        <h1>{product.name}</h1>
        <h2>{product.category}</h2>
        <h2>
          <img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png" />
          {product.price}g
        </h2>
        <h2>{product.description}</h2>

        {/* Insert add to cart button, and increment/decrement buttons here for quantity */}
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
