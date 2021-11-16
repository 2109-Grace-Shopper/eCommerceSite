import axios from 'axios';

const token = window.localStorage.getItem('token');   ///this helps get the token from the user
const header = {
  headers: {
    authorization: token,   ///set it as the authorization header to communicate with the backend to recognize the user
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

// THUNKS
export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/order', header); ///here we have the get route for the api order
      dispatch(_setItems(data));                   ///(continued) and we are attaching the header to identify the specific user to get the specific order
    } catch (error) {                             /// then it will set the items with the data it gets back
      console.log(error);
    }
  };
};

export const addItem = (productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(   /// this is with the post route
        '/api/order',                  ///route /// we needed to get the productId and quantity to be able to make a new orderline
        { productId, quantity },      ///body
        header                       ///header
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
      const { data } = await axios.put(  ///to update we are using a put
        '/api/order',             ///route 
        { productId, quantity },  ///body
        header                    ///header
      );
      dispatch(_updateItem(data)); ///then we will update that item in our store
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete('/api/order', {  /// using delete to remove the item
        headers: {              ///header
          Authorization: token, 
        },
        data: {
          productId: productId, ///body
        },
      });
      dispatch(_removeItem(data));  ///removing the item from the store
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function orderReducer(state = [], action) {  //our order is an array of objects 
  switch (action.type) {
    case SET_ITEMS:
      return action.items; //result of '/api/order'
    case ADD_ITEM:              /// if we wanted to add an item 
      if (
        state.filter((item) => item.productId === action.item.productId) //checks if there is an existing orderline in our state
          .length > 0
      ) {
        return state.map((item) =>  
          item.productId === action.item.productId ? action.item : item  ///if it exists we want to update that
        );
      } else {
        return [...state, action.item];         ///otherwise return the same item
      }
    case UPDATE_ITEM:                         ///updating item
      return state.map((item) =>
        item.productId === action.item.productId ? action.item : item
      );
    case REMOVE_ITEM:                       ///removing item
      return state.filter((item) => item.productId !== action.item.productId);
    default:
      return state;
  }
}
