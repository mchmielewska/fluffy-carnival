/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { store } from './store';
import { getUsers, getCurrentUser } from './actions/usersActions';
import { getPosts } from './actions/postsActions';
import { getFriendsList, getPendingInvites } from './actions/friendsActions';
import { getLikes } from './actions/likesActions';

import * as FilePond from 'filepond';
import '../node_modules/filepond/dist/filepond.min.css';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import '../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/LoginComponent/Login';
import Post from './components/SinglePostComponent/Post';
import Users from './components/Users';

import Dashboard from './components/Dashboard';
import Resetpassword from './components/ResetPasswordComponent/Resetpassword';
import Resetpassword2 from './components/ResetPasswordComponent/Resetpassword2';
import Useractivated from './components/UserActivated';
import UserCreated from './components/UserCreated';
import PostAdded from './components/AddPostComponent/PostAdded';
import AddPost from './components/AddPostComponent/AddPost';
import UserProfile from './components/UserProfileComponent/UserProfile';
import EditUser from './components/EditUserComponent/EditUser';
import UserUpdated from './components/EditUserComponent/UserUpdated';
import EditPost from './components/EditPostComponent/EditPost';
import PostUpdated from './components/EditPostComponent/PostUpdated';
import Friends from './components/FriendsComponent/Friends';
import Search from './components/SearchComponent/Search';
import Favourites from './components/Favourites';
import { cleanErrors } from './actions/errorActions';

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
          <Route exact path="/posts" component={Dashboard} />
          <Route exact path="/tags/:tag" component={Dashboard} />
          <Route exact path="/posts/:post_id" component={Post} />
          <Route path="/postadded" component={PostAdded} />
          <Route exact path="/post_add" component={AddPost} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:user_id" component={UserProfile} />
          <Route exact path="/users/:user_id/edit" component={EditUser} />
          <Route path="/userupdated" component={UserUpdated} />
          <Route path="/postupdated" component={PostUpdated} />
          <Route exact path="/posts/:post_id/edit" component={EditPost} />
          <Route path="/friends" component={Friends} />
          <Route path="/search" component={Search} />
          <Route path="/favourites" component={Favourites} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
  currentUser: state.auth.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (history) => {
      dispatch(getPosts(history));
    },
    getUsers: () => {
      dispatch(getUsers());
    },
    getLikes: () => {
      dispatch(getLikes());
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    cleanErrors: () => {
      dispatch(cleanErrors());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
