import axios from 'axios';

const token = window.localStorage.getItem('token');
const header = {
  headers: {
    // Setting authorization header to use token in backend routes
    authorization: token,
  },
};

// ACTION TYPES:
const SET_PAYMENT = 'SET_PAYMENT';
const ADD_PAYMENT = 'ADD_PAYMENT';
const UPDATE_PAYMENT = 'UPDATE_PAYMENT';

// ACTION CREATORS:
const _setPayment = (payment) => {
  return {
    type: SET_PAYMENT,
    payment,
  };
};

const _addPayment = (payment) => {
  return {
    type: ADD_PAYMENT,
    payment,
  };
};

const _updatePayment = (payment) => {
  return {
    type: UPDATE_PAYMENT,
    payment,
  };
};

// THUNKS:
export const fetchPayment = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/payment', header);
      dispatch(_setPayment(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPayment = (orderId, payment) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.post('/api/payment', payment, header);
        dispatch(_addPayment(data));
      } else {
        const { data } = await axios.post('/api/payment/guest', {
          payment,
          orderId,
        });
        dispatch(_addPayment(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePayment = (payment) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/payment', payment, header);
      dispatch(_updatePayment(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER:
export default function paymentReducer(state = {}, action) {
  switch (action.type) {
    case SET_PAYMENT:
      return action.payment;
    case ADD_PAYMENT:
      return action.payment;
    case UPDATE_PAYMENT:
      return action.payment;
    default:
      return state;
  }
}
