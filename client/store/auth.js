import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SIGN_UP = "SIGN_UP"

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const signUp = signup => ({type: SIGN_UP, signup})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const signup_me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(signUp(res.data))
  }
}

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const signup = (firstName, lastName, email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {firstName, lastName, email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(signup_me())
  } catch (authError) {
    return dispatch(signUp({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SIGN_UP:
    return action.signup
    default:
      return state
  }
}
