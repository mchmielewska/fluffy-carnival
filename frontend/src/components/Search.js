import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  dateBuilder,
  privacyLevelIcon,
  shortenDescription,
  readMore,
} from '../utils/postUtils';
import UserCard from './UserCard';
import { inviteFriend } from '../actions/friendsActions';
import { cleanErrors } from '../actions/errorActions';
import Author from './Author';
class Search extends Component {
  render() {
    const error = this.props.errors;
    const posts = this.props.posts;
    const users = this.props.users;
    const usersFound = this.props.usersFound;
    const showError = error ? <span>{error.message}</span> : null;

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
          const authorProps = {
            users: users,
            post: post,
            class: 'm1',
          };
          return (
            <div className="col search-item" key={post.id}>
              <div className="post card">
                <div className="card-content row">
                  <div className="post-header left-align col m10">
                    <Author {...authorProps} />
                  </div>
                </div>
                <div className="card-content text search">
                  <Link to={'/posts/' + post.id}>
                    <h6 className="card-title">{post.title}</h6>
                  </Link>
                  <p className="description">
                    {shortenDescription(post.description, 300)}
                  </p>
                  <p className="center-align">{readMore(post, 300)}</p>
                </div>
                <div className="card-action row">
                  <div className="user-details left-align col m10">
                    <p className="card-date">{dateBuilder(post.publishDate)}</p>
                  </div>
                  <div className="col m2 right-align privacy-level">
                    <span title={privacyLevelIcon(post.privacyLevel)}>
                      <i className="material-icons">
                        {privacyLevelIcon(post.privacyLevel)}
                      </i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
    ) : (
      <div className="center">{showError}</div>
    );

    return (
      <div className="row">
        <Sidebar {...this.props} />
        <div className="col s10">
          <h5>Users:</h5>
          <div className="row center user-list">{userList}</div>
          <h5>Posts:</h5>
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
    inviteFriend: (id) => {
      dispatch(inviteFriend(id));
    },
    cleanErrors: () => {
      dispatch(cleanErrors());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
