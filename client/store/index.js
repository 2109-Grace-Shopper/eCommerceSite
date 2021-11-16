import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './allProducts';
import singleProduct from './singleProduct';
import users from './allUsers';
import singleUser from './singleUser';
import order from './order';
import orderHistory from './orderHistory';

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  users,
  singleUser,
  order,
  orderHistory,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
