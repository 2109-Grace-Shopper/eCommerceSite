import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store';
import { Paper, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { logout } from '../store';

export class ProfilePage extends React.Component {
  render() {
    return (
      <Box>
        <Paper elevation={10}>
          <h4>
            Hello, {this.props.loggedInUser.firstName}&nbsp;
            <span className="wave">👋 </span>
          </h4>
          <img
            src={this.props.loggedInUser.avatar}
            style={{ width: '100px', height: '100px' }}
          />
          <h4>
            Name: {this.props.loggedInUser.firstName}{' '}
            {this.props.loggedInUser.lastName}{' '}
          </h4>
          <h4>Email: {this.props.loggedInUser.email}</h4>
          <Button>
            <h4 className={'profilebuttonlabel'}>Edit Profile</h4>
          </Button>
          <Button>
            <h4 className={'profilebuttonlabel'}>Previous Purchases</h4>
          </Button>
          <Button>
            <h4 className={'profilebuttonlabel'}>My Cart</h4>
          </Button>
          <Button onClick={this.props.handleLogout}>
            <h4 className={'profilebuttonlabel'}>Log Out</h4>
          </Button>
        </Paper>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    loggedInUser: state.auth
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
