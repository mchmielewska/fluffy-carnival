import { GET_USER_FAVOURITES } from '../actions/types';

const initialState = [];

const singleUserLikesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_FAVOURITES:
      if (
        state.length !== action.payload.length ||
        state.length === 0 ||
        JSON.stringify(state) !== JSON.stringify(action.payload)
      )
        return action.payload;
      return state;
    default:
      return state;
  }
};

export default singleUserLikesReducer;
