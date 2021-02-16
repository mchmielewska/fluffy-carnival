import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserCard from '../UserCardComponent/UserCard';
import { cleanErrors } from '../../actions/errorActions';
import FoundPost from './FoundPost';
import Login from '../LoginComponent/Login';
class Search extends Component {
  render() {
    const error = this.props.errors;
    const posts = this.props.posts;
    const users = this.props.users;
    const usersFound = this.props.usersFound;
    const showError = error ? <span>{error.message}</span> : null;

    const { isAuthenticated } = this.props.auth;

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    const userList = usersFound.length ? (
      usersFound.map((user) => {
        const userProps = {
          ...this.props,
          user: user,
        };
        return <UserCard {...userProps} key={user._id} />;
      })
    ) : (
      <div className="center">{showError}</div>
    );

    const postList = posts.length ? (
      posts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          const postProps = {
            users: users,
            post: post,
          };
          return <FoundPost {...postProps} key={post.id} />;
        })
    ) : (
      <div className="center">{showError}</div>
    );

    const authPage = (
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Users:</h5>
            <div className="row center user-list users-container">{userList}</div>
            <h5>Posts:</h5>
            <div className="row center post-list">{postList}</div>
          </div>
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user,
    users: state.users.all,
    posts: state.search.posts,
    usersFound: state.search.users,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanErrors: () => {
      dispatch(cleanErrors());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
