import axios from 'axios';

const token = window.localStorage.getItem('token');
const header = {
  headers: {
    authorization: token,
  },
};

// ACTION TYPES:
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

// ACTION CREATORS:
const _setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

const _addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

const _removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};

// THUNKS
export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/order', header);
      dispatch(_setItems(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItem = (productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/order', {
        headers: { authorization: token },
        productId,
        quantity,
      });
      dispatch(_addItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete('/api/order', {
        headers: { authorization: token },
        productId,
      });
      dispatch(_removeItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.item.id);
    default:
      return state;
  }
}
