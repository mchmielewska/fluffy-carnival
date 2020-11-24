import { combineReducers } from 'redux';
import authReducer from './authReducer';
import  postReducer from './postReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    form: formReducer
});