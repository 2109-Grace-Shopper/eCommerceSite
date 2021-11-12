import axios from 'axios';


//ACTION TYPES:
const ALL_USERS = 'ALL_USERS'

//ACTION CREATORS:
const allUsers = (users) => ({
    type: ALL_USERS,
    users
});


//THUNK CREATORS:
//fetch all users
export const fetchUsers = () => {
    return async dispatch => {
        try{
            const {data: users} = await axios.get('/api/users')
            dispatch(allUsers(users))
        } catch (e) {
            console.log('fetch user error', e);
        }
    }
};


//REDUCER:
export const adminReducer = (state = [], action) => {
    switch (action.type) {
      case ALL_USERS:
        return action.users
      default:
        return state;
    }
}

export default adminReducer
  