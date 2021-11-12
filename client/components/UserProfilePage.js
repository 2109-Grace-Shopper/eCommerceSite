import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store';
import { Grid, Paper, Avatar, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Label } from '@material-ui/icons';
//import '../../public/style.css'
import {logout} from '../store'

/**
 * COMPONENT
 */
const ProfilePage = (props) => {
  console.log(props)
    return (
      <Box>
        <Paper elevation={10}>
          <h4>
            Hello, {props.loggedinuser.firstName}&nbsp;
            <span className="wave">👋 </span>
          </h4>
          <img
            src={props.loggedinuser.avatar}
            style={{ width: '100px', height: '100px' }}
          />
          <h4>
            Name: {props.loggedinuser.firstName}{' '}
            {props.loggedinuser.lastName}{' '}
          </h4>
          <h4>Email: {props.loggedinuser.email}</h4>
          <Button>
            <h4 className={'profilebuttonlabel'}>Edit Profile</h4>
          </Button>
          <Button>
            <h4 className={'profilebuttonlabel'}>Previous Purchases</h4>
          </Button>
          <Button>
            <h4 className={'profilebuttonlabel'}>My Cart</h4>
          </Button>
          <Button onClick={props.handleClick()}>
            <h4 className={'profilebuttonlabel'}>Log Out</h4>
          </Button>
        </Paper>
      </Box>
    );
  }

function mapStateToProps(state) {
  return {
    loggedinuser: state.auth, //we used this to get the profile information without having to use user/id
    //leveraged the auth which uses findByToken to get the profile data
  };
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export const Profile = connect(mapStateToProps, mapDispatch)(ProfilePage);
