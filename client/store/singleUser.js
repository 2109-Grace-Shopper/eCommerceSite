import axios from 'axios';

// ACTION TYPES:
const GOT_SINGLE_USER = 'GOT_SINGLE_USER';

// ACTION CREATORS:
const gotSingleUser = (singleuser) => ({
  type: GOT_SINGLE_USER,
  singleuser,
});

// THUNKS:
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: singleuser } = await axios.get(`/api/users/${id}`);
      dispatch(gotSingleUser(singleuser));
    } catch (e) {
      console.log('fetch single user error', e);
    }
  };
};

// REDUCER:
export const singleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.singleuser;
    default:
      return state;
  }
};

export default singleUserReducer;
