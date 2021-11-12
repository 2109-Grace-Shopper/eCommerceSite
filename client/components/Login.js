import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import {
  Grid,
  Paper,
  Avatar,
  CustomInput,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const paperStyle = {
    padding: 30,
    height: '50vh',
    width: 280,
    margin: '100px auto',
  };
  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };
  const btnstyle = {
    margin: '8px 0',
  };

  //added to redirect to profile page once user logged in
  const history = useHistory();

  const handleSubmitProfile = (evt) => {
    console.log('starting dispatch');
    //wont run until the promise is resolved
    handleSubmit(evt).then(() => {
      console.log('then go to profile');
      let path = '/profile';
      history.push(path);
    });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmitProfile} name={name}>
          <div>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required="required"
            />
            <label htmlFor="password"></label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required="required"
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth="fullWidth"
          >
            {displayName}
          </Button>
          {error && error.response && <div>{error.response.data}</div>}
        </form>
        <div className="signup__link">
          <Link href="/signup">I want to sign up</Link>
        </div>
      </Paper>
    </Grid>
  );
};

const mapLogin = (state) => {
  return { name: 'login', displayName: 'Login', error: state.auth.error };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      return dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
