import { GET_CURRENT_USER, GET_USERS } from '../actions/types';

const initialState = {};

const usersReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      if (
        state.currentUser?.user.name === undefined ||
        JSON.stringify(state.currentUser) !== JSON.stringify(action.payload)
      )
        return {
          ...state,
          currentUser: action.payload,
        };
      return state;
    case GET_USERS:
      if (
        state.all === undefined ||
        JSON.stringify(state.all) !== JSON.stringify(action.payload)
      )
        return {
          ...state,
          all: action.payload,
        };
    default:
      return state;
  }
};

export default usersReducer;
