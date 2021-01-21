import { GET_ERRORS, CLEAN_ERRORS } from '../actions/types';
const initialState = '';

const errorReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      if (JSON.stringify(state) !== JSON.stringify(action.error)) {
        return action.error;
      } else {
        return state;
      }

    case CLEAN_ERRORS:
      return null;
    default:
      return state;
  }
};

export default errorReducer;
