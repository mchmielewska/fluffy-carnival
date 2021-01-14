import { GET_ERRORS, CLEAN_ERRORS } from '../actions/types';
const initialState = '';

const errorReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.error;
    case CLEAN_ERRORS:
      return null;
    default:
      return state;
  }
};

export default errorReducer;
