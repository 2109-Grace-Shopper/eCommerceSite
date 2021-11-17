import axios from 'axios';

// ACTION TYPES:
const ALL_USERS = 'ALL_USERS';

// ACTION CREATORS:
const allUsers = (users) => ({
  type: ALL_USERS,
  users,
});

// THUNKS:
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get('/api/users');
      dispatch(allUsers(users));
    } catch (e) {
      console.log('fetch user error', e);
    }
  };
};

// REDUCER:
export const users = (state = [], action) => {
  switch (action.type) {
    case ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

export default users;
