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
    //   const paperStyle = {
    //     padding: 30,
    //     height: '50vh',
    //     width: 280,
    //     margin: "100px auto"
    // }
    // const avatarStyle = {
    //     backgroundColor: '#1bbd7e'
    // }
  }
  

  render() {
    return (
          <Box>
            <Paper elevation={10}>
            <Avatar> Avatar Profile: {this.props.loggedinuser.avatar}</Avatar>
            <h2>Name: {this.props.loggedinuser.firstName} {this.props.loggedinuser.lastName} </h2>
            <h2>Email: {this.props.loggedinuser.email}</h2>
            <Button><h3>Previous Purchases</h3></Button>
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