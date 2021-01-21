/*jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import 'fontsource-roboto';
import './index.css';

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from './actions/authentication';
import { getUsers, getCurrentUser } from './actions/usersActions';
import { getPosts } from './actions/postsActions';
import { getFriendsList, getPendingInvites } from './actions/friendsActions';
import { getLikes } from './actions/likesActions';

import { PersistGate } from 'redux-persist5/integration/react';

import history from './history';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(getCurrentUser());
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getUsers());
  store.dispatch(getPosts());
  store.dispatch(getLikes());
  store.dispatch(getFriendsList());
  store.dispatch(getPendingInvites());
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);
