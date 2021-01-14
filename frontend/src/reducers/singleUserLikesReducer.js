import { GET_USER_FAVOURITES } from '../actions/types';

const initialState = [];

const singleUserLikesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_FAVOURITES:
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
    default:
      return state;
  }
};

export default singleUserLikesReducer;
