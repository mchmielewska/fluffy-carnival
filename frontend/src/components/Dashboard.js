import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, getPostsByTag } from '../actions/postsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar';
import { getLikes } from '../actions/likesActions';
import { cleanErrors } from '../actions/errorActions';
import SinglePostCard from './SinglePostCard';
import Login from './Login';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    if (this.props.tag !== undefined) {
      let tag = this.props.tag;
      this.props.getPostsByTag(tag);
      this.setState({ tag: undefined });
    } else {
      this.props.getPosts(this.props.history);
    }

    this.props.getLikes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tag !== undefined) {
      let tag = this.props.tag;
      this.props.getPostsByTag(tag);
    } else {
      this.props.getPosts(this.props.history);
    }

    if (this.props.likes !== prevProps.likes) this.props.getLikes();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    const posts = this.props.posts;
    const users = this.props.users;
    const likes = this.props.likes;
    const currentUser = this.props.currentUser.id;

    const postList = posts.length ? (
      posts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          const props = {
            post: post,
            users: users,
            likes: likes,
            currentUser: currentUser,
            classList: 'col m4 s6',
          };
          return <SinglePostCard {...props} key={post.id} />;
        })
    ) : (
      <div className="center">No posts found</div>
    );

    const authPage = (
      <div className="row">
        <Sidebar {...this.props} />
        <div className="col s10">
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let tag = ownProps.match ? ownProps.match.params.tag : undefined;
  if (tag !== undefined) {
    return {
      auth: state.auth,
      tag: tag,
      currentUser: state.auth.user,
      posts: state.posts,
      users: state.users.all,
      likes: state.likes,
      errors: state.errors,
    };
  } else {
    return {
      auth: state.auth,
      currentUser: state.auth.user,
      posts: state.posts,
      users: state.users.all,
      likes: state.likes,
      errors: state.errors,
    };
  }
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
    getPostsByTag: (tag) => {
      dispatch(getPostsByTag(tag));
    },
    cleanErrors: () => {
      dispatch(cleanErrors());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
