import axios from 'axios';

const token = window.localStorage.getItem('token');
const header = {
  headers: {
    authorization: token,
  },
};

// ACTION TYPES:
const SET_ORDERS = 'SET_ORDERS';

// ACTION CREATORS:
const _setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

// THUNKS
export const fetchOrderHistory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/order/history', header);
      dispatch(_setOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function orderHistory(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
