import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../actions/postsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar';
import { getLikes, getUserFavourites } from '../actions/likesActions';
import SinglePostCard from './SinglePostCard';
import Login from './Login';

class Favourites extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.history);
    this.props.getLikes();
    this.props.getUserFavourites();
  }

  componentDidUpdate() {
    this.props.getLikes();
    this.props.getUserFavourites();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    const users = this.props.users;
    const likes = this.props.likes;
    const currentUser = this.props.currentUser.id;
    const postsLikedByUser = this.props.userlikes;

    const postList = postsLikedByUser.length ? (
      postsLikedByUser
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          const id = post.id ? post.id : post._id;

          const props = {
            post: post,
            users: users,
            likes: likes,
            currentUser: currentUser,
            classList: 'col single-post-card',
          };
          return <SinglePostCard {...props} key={id} />;
        })
    ) : (
      <div className="center">No posts found</div>
    );

    const authPage = (
        <div className="container">
          <div className="row center post-list">{postList}</div>
        </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentUser: state.auth.user,
    posts: state.posts,
    users: state.users.all,
    likes: state.likes,
    userlikes: state.userlikes,
  };
};

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
    getUserFavourites: () => {
      dispatch(getUserFavourites());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Favourites)
);
