import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import friendsReducer from './friendsReducer';
import likesReducer from './likesReducer';
import searchReducer from './searchReducer';
import errorReducer from './errorReducer';
import singleUserLikesReducer from './singleUserLikesReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  users: usersReducer,
  friends: friendsReducer,
  form: formReducer,
  likes: likesReducer,
  comments: commentsReducer,
  userlikes: singleUserLikesReducer,
  search: searchReducer,
  errors: errorReducer,
});

export default rootReducer;
