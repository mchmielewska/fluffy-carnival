/*jshint esversion: 6 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { getUsers, getCurrentUser } from './actions/usersActions';
import { getPosts } from './actions/postsActions';
import { getFriendsList, getPendingInvites } from './actions/friendsActions';
import { getLikes } from './actions/likesActions';

import { PersistGate } from 'redux-persist5/integration/react';
import * as FilePond from 'filepond';
import '../node_modules/filepond/dist/filepond.min.css';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import '../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Post from './components/Post';
import Users from './components/Users';

import Dashboard from './components/Dashboard';
import Resetpassword from './components/Resetpassword';
import Resetpassword2 from './components/Resetpassword2';
import Useractivated from './components/UserActivated';
import UserCreated from './components/UserCreated';
import PostAdded from './components/PostAdded';
import AddPost from './components/AddPost';
import UserProfile from './components/UserProfile';
import EditUser from './components/EditUser';
import UserUpdated from './components/UserUpdated';
import EditPost from './components/EditPost';
import PostUpdated from './components/PostUpdated';
import Friends from './components/Friends';

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

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 100,
  imageResizeTargetWidth: 100,
  imageResizeTargetHeight: 150,
});

FilePond.parse(document.body);

class App extends Component {
  render() {
    FilePond.parse(document.body);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div>
              <Header />
              <Route exact path="/" component={Home} />
              <div>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route path="/useractivated" component={Useractivated} />
                <Route path="/usercreated" component={UserCreated} />
                <Route path="/resetpassword" component={Resetpassword} />
                <Route path="/resetpassword2" component={Resetpassword2} />
                <Route exact path="/posts/" component={Dashboard} />
                <Route exact path="/posts/:post_id" component={Post} />
                <Route path="/postadded" component={PostAdded} />
                <Route exact path="/post_add" component={AddPost} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/users/:user_id" component={UserProfile} />
                <Route exact path="/users/:user_id/edit" component={EditUser} />
                <Route path="/userupdated/" component={UserUpdated} />
                <Route path="/postupdated/" component={PostUpdated} />
                <Route exact path="/posts/:post_id/edit" component={EditPost} />
                <Route path="/friends" component={Friends} />
              </div>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
