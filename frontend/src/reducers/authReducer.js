import { SET_CURRENT_USER, LOGOUT_USER, SET_PATH } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  path: '/',
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log('SET_CURRENT_USER');
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case SET_PATH:
      console.log('setpath: ', action.payload !== state.path);
      console.log('action', action.payload);
      console.log('state', state.path);
      // debugger
      if (action.payload !== state.path)
        return {
          ...state,
          path: action.payload,
        };
      else return state;
    default:
      return state;
  }
};

export default authReducer;
