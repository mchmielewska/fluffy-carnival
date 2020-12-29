import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import friendsReducer from './friendsReducer';
import likesReducer from './likesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  users: usersReducer,
  friends: friendsReducer,
  form: formReducer,
  likes: likesReducer,
});

export default rootReducer;
