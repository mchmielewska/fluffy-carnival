import { ADD_COMMENT, REMOVE_COMMENT, GET_COMMENTS } from '../actions/types';

const initialState = [];

const commentsReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state];
    case REMOVE_COMMENT:
      return [...state];
    case GET_COMMENTS:
      if (state.length !== action.payload.length) return action.payload;
      return state;
    default:
      return state;
  }
};

export default commentsReducer;
