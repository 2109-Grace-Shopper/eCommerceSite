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
const UPDATE_ITEM = 'UPDATE_ITEM';
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

const _updateItem = (item) =>{
  return {
    type: UPDATE_ITEM,
    item,
  };
}

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
      const { data } = await axios.post(
        '/api/order',
        { productId, quantity }, header
      );
      dispatch(_addItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateItem = (productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/order', { productId, quantity }, header);
      dispatch(_updateItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete('/api/order', { productId }, header);
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
      if (
        state.filter((item) => item.productId === action.item.productId)
          .length > 0
      ) {
        return state.map((item) => {
          if (item.productId === action.item.productId) {
            item.quantity = action.item.quantity;
          }
          return item;
        });
      } else {
        return [...state, action.item];
      }
    case UPDATE_ITEM:
      return state.map((item) =>
      (item.productId === action.item.productId ? action.item : item));
    case REMOVE_ITEM:
      return state.filter((item) => item.productId !== action.item.productId);
    default:
      return state;
  }
}
