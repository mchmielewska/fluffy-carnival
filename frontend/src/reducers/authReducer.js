import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
