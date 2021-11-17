import axios from 'axios';

// ACTION TYPES:
const GOT_PRODUCT = 'GOT_PRODUCT';

// ACTION CREATORS:
const setProduct = (product) => ({
  type: GOT_PRODUCT,
  product,
});

// THUNKS:
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${productId}`);
      dispatch(setProduct(product));
    } catch (error) {
      console.log('Error in FetchProduct thunk', error);
    }
  };
};

// REDUCER:
export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
