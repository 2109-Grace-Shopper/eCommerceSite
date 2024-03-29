import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { me } from './store';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { Login } from './components/Login';
import { Signup } from './components/SignUp';
import { Profile } from './components/UserProfilePage';
import About from './components/About';
import Confirm from './components/ConfirmPage';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';
import NotFound from './components/NotFound';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
