import axios from 'axios';


//ACTION TYPES:
const GOT_SINGLE_USER = 'GOT_SINGLE_USER'

//ACTION CREATORS:
//single user creator:
const gotSingleUser = (singleuser) => ({
    type: GOT_SINGLE_USER,
    singleuser
});

//THUNK CREATORS:
//fetch single user thunk:
export const fetchSingleUser = (id) => {
    //console.log('in thunk', id)
      return async dispatch => {
        try {
          const {data: singleuser} = await axios.get(`/api/users/${id}`);
          dispatch(gotSingleUser(singleuser))
        } catch (e){
          console.log('fetch single user error', e);
        }
      }
};

//REDUCER:
export const userReducer = (state = {}, action) => {
    switch (action.type) {
      case GOT_SINGLE_USER:
        console.log('in reducer', action.singleuser)  
        return action.singleuser
      default:
        return state;
    }
}

export default userReducer
  