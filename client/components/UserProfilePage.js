import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import OrderHistory from './OrderHistory';
import { Route } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

export class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profile_box">
          <h1>
            Hello, {this.props.user.firstName}&nbsp;
            <span className="wave">👋 </span>
          </h1>
          <img
            src={this.props.user.avatar}
            style={{ width: '100px', height: '100px' }}
          />
          <h3>
            Name: {this.props.user.firstName}{' '}
            {this.props.user.lastName}{' '}
          </h3>
          <h3>Email: {this.props.user.email}</h3>
          <div>
            <div className="profile_info">
              <Link to='/profile/edit'>
                <h4 className='profilebuttonlabel'>EDIT PROFILE</h4>
              </Link>
              <Link to='/profile/address'>
                <h4 className='profilebuttonlabel'>SHIPPING ADDRESS</h4>
              </Link>
              <Link to='/profile/payment'>
                <h4 className='profilebuttonlabel'>PAYMENT METHOD</h4>
              </Link>
              <Link to='/profile/history'>
                <h4 className='profilebuttonlabel'>ORDER HISTORY</h4>
              </Link>
              <Link to='/cart'>
                <h4 className='profilebuttonlabel'>MY CART</h4>
              </Link>
              <Button onClick={this.props.handleLogout}>
                <h4 className='profilebuttonlabel'>LOG OUT</h4>
              </Button>
            </div>
            <hr/>
            <div>
              <Route path='/profile/edit' render={() => <EditProfile user={this.props.user} />} />
              <Route path='/profile/address' render={() => <AddressForm user={this.props.user} />} />
              <Route path='/profile/payment' render={() => <PaymentForm user={this.props.user} />} />
              <Route path='/profile/history' render={() => <OrderHistory user={this.props.user} />} />
            </div>
          </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
      window.location.reload()
    },
  };
};

export const Profile = connect(mapState, mapDispatch)(ProfilePage);
