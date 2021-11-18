import axios from 'axios';

const token = window.localStorage.getItem('token');
const header = {
  headers: {
    // Setting authorization header to use token in backend routes
    authorization: token,
  },
};

// ACTION TYPES:
const SET_ADDRESS = 'SET_ADDRESS';
const ADD_ADDRESS = 'ADD_ADDRESS';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

// ACTION CREATORS:
const _setAddress = (address) => {
  return {
    type: SET_ADDRESS,
    address,
  };
};

const _addAddress = (address) => {
  return {
    type: ADD_ADDRESS,
    address,
  };
};

const _updateAddress = (address) => {
  return {
    type: UPDATE_ADDRESS,
    address,
  };
};

// THUNKS:
export const fetchAddress = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/address', header);
      dispatch(_setAddress(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (orderId, address) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.post('/api/address', address, header);
        dispatch(_addAddress(data));
      } else {
        const { data } = await axios.post('/api/address/guest', {
          address,
          orderId,
        });
        dispatch(_addAddress(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateAddress = (address) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/address', address, header);
      dispatch(_updateAddress(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER:
export default function addressReducer(state = {}, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return action.address;
    case ADD_ADDRESS:
      return action.address;
    case UPDATE_ADDRESS:
      return action.address;
    default:
      return state;
  }
}
