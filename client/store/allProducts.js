import axios from 'axios';

// ACTION TYPES:
const SET_PRODUCTS = 'SET_PRODUCTS';

// ACTION CREATORS:
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// THUNKS
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function products(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
