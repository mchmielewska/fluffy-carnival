import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from '../actions/types';

const initialState = [];

const commentsReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state];
    case REMOVE_COMMENT:
      return [...state];
    case LIKE_COMMENT:
      return [...state];
    case UNLIKE_COMMENT:
      return [...state];
    case GET_COMMENTS:
      if (
        state.length !== action.payload.length ||
        JSON.stringify(state) !== JSON.stringify(action.payload)
      )
        return action.payload;
      return state;
    default:
      return state;
  }
};

export default commentsReducer;
