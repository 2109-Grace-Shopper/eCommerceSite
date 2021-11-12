import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store';
import {Grid, Paper, Avatar, Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';
//import '../../public/style.css'

/**
 * COMPONENT
 */
 export class ProfilePage extends React.Component {

  componentDidMount() {
    console.log('in component did mount')
    console.log('checking', this.props.loggedinuser)
    //this.props.fetchSingleUser(this.props.loggedinuser.id)
  }

  constructor() {
    super();
  }
  

  render() {
    return (
          <Box>
            <Paper elevation={10}>
              {/* <Avatar> Avatar Profile: {this.props.loggedinuser.avatar} </Avatar> */}
              <h4>Hello, {this.props.loggedinuser.firstName}&nbsp;<span class="wave">👋 </span></h4>
              <img src={this.props.loggedinuser.avatar} style={{ width: '100px', height: '100px'}} />
              <h4>Name: {this.props.loggedinuser.firstName} {this.props.loggedinuser.lastName} </h4>
              <h4>Email: {this.props.loggedinuser.email}</h4>
              <Button><h4>Edit Profile</h4></Button>
              <Button><h4>Previous Purchases</h4></Button>
              <Button><h4>Continue Shopping</h4></Button>
            </Paper>
          </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
  loggedinuser: state.auth
  }
}
// const mapDispatch = (dispatch) => ({
//   fetchSingleUser: (id) => dispatch(fetchSingleUser(id))
// })

export const Profile = connect(mapStateToProps)(ProfilePage)