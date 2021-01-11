import { DELETE_POST, GET_POSTS, GET_POSTS_BY_TAG } from '../actions/types';

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

    case GET_POSTS_BY_TAG:
      console.log(action.payload);
      const newStateTags = action.payload.sort(
        (a, b) => a.publishDate < b.publishDate
      );
      if (
        state.length !== newStateTags.length ||
        state.length === 0 ||
        JSON.stringify(state) !== JSON.stringify(newStateTags)
      )
        return newStateTags;
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
