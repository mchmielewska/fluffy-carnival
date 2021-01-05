import { FIND_POSTS, FIND_USERS } from '../actions/types';

const initialState = {
  posts: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FIND_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case FIND_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
