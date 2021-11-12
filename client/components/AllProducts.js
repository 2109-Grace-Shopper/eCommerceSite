import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/allProducts';
import {
  Card,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFilterChange(evt) {
    this.setState({ filter: evt.target.value });
  }

  filterProducts() {
    let products = this.props.products;
    if (this.state.filter === 'all') return products;
    else {
      return products.filter(
        (product) => product.category === this.state.filter
      );
    }
  }

  handleSubmit(product) {
    // Will have to change this later after adding cart functionality
    console.log(`${product.name} (cost ${product.price}g) added to cart`);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.filterProducts();
    return (
      <div>
        <div className="filter">
          <h3>Filter Products:</h3>
          <Select
            id="productsFilter"
            value={this.state.filter}
            onChange={this.handleFilterChange}
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'seeds'}>Seeds</MenuItem>
            <MenuItem value={'trees'}>Trees</MenuItem>
            <MenuItem value={'stock items'}>Stock Items</MenuItem>
            <MenuItem value={'farming utility'}>Farming Utility</MenuItem>
            <MenuItem value={'seasonal decor'}>Seasonal Decor</MenuItem>
          </Select>
        </div>
        <div className="productsContainer">
          {products.length === 0 && <h1>No products to display!</h1>}
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{ width: 275, margin: 3 }}
              onClick={() => this.handleSubmit(product)}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Link to={`/products/${product.id}`}>
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
