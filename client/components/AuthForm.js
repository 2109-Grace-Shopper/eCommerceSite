import React from 'react';
import {connect} from 'react-redux';
import {authenticate} from '../store';
import {Grid, Paper, Avatar, CustomInput, Button, Typography, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

/**
 * COMPONENT
 */
const AuthForm = props => {
    const {name, displayName, handleSubmit, error} = props

    const paperStyle = {
        padding: 30,
        height: '50vh',
        width: 280,
        margin: "100px auto"
    }
    const avatarStyle = {
        backgroundColor: '#1bbd7e'
    }
    const btnstyle = {
        margin: '8px 0'
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit} name={name}>
                    <div>
                        <label htmlFor="email">
                        </label>
                        <input name="email" type="email" placeholder="Email" required="required"/>
                        <label htmlFor="password">
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required="required"/>
                    </div>
                    <Button
                        type="submit"
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth="fullWidth">{displayName}</Button>
                        {error && error.response && <div>{error.response.data}</div>}
                </form>
                <div className = "signup__link">
                    <Link href="/signup">
                      I want to sign up
                    </Link>
                </div>
            </Paper>
        </Grid>
    )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = state => {
    return {name: 'login', displayName: 'Login', error: state.auth.error}
}

const mapDispatch = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            const formName = evt.target.name
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(authenticate(email, password, formName))
        }
    }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
