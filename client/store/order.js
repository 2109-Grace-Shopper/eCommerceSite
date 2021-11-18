import axios from 'axios';
import history from '../history';

const token = window.localStorage.getItem('token');
const header = {
  headers: {
    // Setting authorization header to use token in backend routes
    authorization: token,
  },
};

// ACTION TYPES:
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_ITEMS = 'CLEAR_ITEMS';

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

const _updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};

const _removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};

const _clearItems = () => {
  return {
    type: CLEAR_ITEMS,
  };
};

// THUNKS:
export const fetchItems = (orderId) => {
  return async (dispatch) => {
    try {
      if (token) {
        // First case handles logged in user using the token -- same logic follows for other thunks
        const { data } = await axios.get('/api/order', header);
        dispatch(_setItems(data));
      } else {
        // Second case handles taking the orderId from local storage to get guest order -- same logic follows for other thunks
        // Had to use post route in this case since we cannot send a body with a GET request
        const { data } = await axios.post('/api/guest/order', { orderId });
        dispatch(_setItems(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItem = (orderId, productId, quantity) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.post(
          '/api/order',
          { productId, quantity },
          header
        );
        dispatch(_addItem(data));
      } else {
        const { data } = await axios.post('/api/guest', {
          orderId,
          productId,
          quantity,
        });
        if (window.localStorage.orderId !== data.orderId) {
          window.localStorage.setItem('orderId', data.orderId);
        }
        dispatch(_addItem(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateItem = (orderId, productId, quantity) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.put(
          '/api/order',
          { productId, quantity },
          header
        );
        dispatch(_updateItem(data));
      } else {
        const { data } = await axios.put('/api/guest', {
          orderId,
          productId,
          quantity,
        });
        dispatch(_updateItem(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeItem = (orderId, productId) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.delete('/api/order', {
          headers: {
            Authorization: token,
          },
          data: {
            productId: productId,
          },
        });
        dispatch(_removeItem(data));
      } else {
        const { data } = await axios.delete('/api/guest', {
          data: {
            orderId: orderId,
            productId: productId,
          },
        });
        dispatch(_removeItem(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearItems = (orderId) => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.put('/api/order/confirm', {}, header);
        dispatch(_clearItems());
      } else {
        const { data } = await axios.put('/api/guest/confirm', { orderId });
        dispatch(_clearItems());
        window.localStorage.setItem('orderId', 0);
      }
      history.push('/confirm');
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER:
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      if (
        // First case handles adding items if orderLine already exists
        state.filter((item) => item.productId === action.item.productId)
          .length > 0
      ) {
        return state.map(
          (item) =>
            item.productId === action.item.productId ? action.item : item // If it exists we want to update that, otherwise return same item
        );
      } else {
        // Second case adds item if orderLine doesn't exist in specific order
        return [...state, action.item];
      }
    case UPDATE_ITEM:
      return state.map((item) =>
        item.productId === action.item.productId ? action.item : item
      );
    case REMOVE_ITEM:
      return state.filter((item) => item.productId !== action.item.productId);
    case CLEAR_ITEMS:
      return [];
    default:
      return state;
  }
}
