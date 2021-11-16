import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import EditProfile from './Editprofile';
import OrderHistory from './OrderHistory';
import { Route } from 'react-router-dom';

export class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profile_box">
          <h4>
            Hello, {this.props.user.firstName}&nbsp;
            <span className="wave">👋 </span>
          </h4>
          <img
            src={this.props.user.avatar}
            style={{ width: '100px', height: '100px' }}
          />
          <h4>
            Name: {this.props.user.firstName}{' '}
            {this.props.user.lastName}{' '}
          </h4>
          <h4>Email: {this.props.user.email}</h4>
          <div>
            <div>
              <Link to='/profile/edit'>
                <h4 className='profilebuttonlabel'>Edit Profile</h4>
              </Link>
              <Link to='/profile/history'>
                <h4 className='profilebuttonlabel'>Previous Purchases</h4>
              </Link>
              <Link to='/cart'>
                <h4 className='profilebuttonlabel'>My Cart</h4>
              </Link>
              <Button onClick={this.props.handleLogout}>
                <h4 className='profilebuttonlabel'>Log Out</h4>
              </Button>
            </div>
            <hr/>
            <div>
              <Route path='/profile/edit' render={() => <EditProfile user={this.props.user} />} />
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
