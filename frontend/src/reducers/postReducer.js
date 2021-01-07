import { DELETE_POST, GET_POSTS } from '../actions/types';

const initialState = [];

const postReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      const newState = action.payload.sort(
        (a, b) => a.publishDate < b.publishDate
      );
      if (
        state.length !== newState.length ||
        state.length === 0 ||
        JSON.stringify(state) !== JSON.stringify(newState)
      )
        return newState;
      return state;
    case DELETE_POST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
