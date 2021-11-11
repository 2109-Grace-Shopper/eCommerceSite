import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/allProducts';
import { Card, Grid, Button } from '@mui/material';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="productsContainer">
        {this.props.products.length === 0 && <h1>No products to display!</h1>}
        {this.props.products.map((product) => (
          <Card key={product.id} sx={{ width: 275, margin: 3 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Link to="#">
                <h3 style={{ fontSize: 23 }}>{product.name}</h3>
              </Link>
              <img src={product.imageUrl} width="75px" height="75px" />
              <h3>Price: {product.price}g</h3>
              <Button variant="contained" sx={{ margin: 2 }}>
                Add to Cart
              </Button>
            </Grid>
          </Card>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
