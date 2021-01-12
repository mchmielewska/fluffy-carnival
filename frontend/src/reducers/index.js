import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import friendsReducer from './friendsReducer';
import likesReducer from './likesReducer';
import searchReducer from './searchReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  users: usersReducer,
  friends: friendsReducer,
  form: formReducer,
  likes: likesReducer,
  search: searchReducer,
  errors: errorReducer
});

export default rootReducer;
