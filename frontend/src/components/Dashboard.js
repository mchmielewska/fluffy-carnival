import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, getPostsByTag } from '../actions/postsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar';
import { getLikes } from '../actions/likesActions';
import { cleanErrors } from '../actions/errorActions';
import SinglePostCard from './SinglePostCard';

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

    this.props.getLikes();
  }

  render() {
    const posts = this.props.posts;
    const users = this.props.users;
    const allLikes = this.props.likes;
    const currentUser = this.props.currentUser.id;

    const postList = posts.length ? (
      posts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          const props = {
            post: post,
            users: users,
            allLikes: allLikes,
            currentUser: currentUser,
            classList: 'col m4 s6',
          };
          return <SinglePostCard {...props} key={post.id} />;
        })
    ) : (
      <div className="center">No posts found</div>
    );

    return (
      <div className="row">
        <Sidebar {...this.props} />
        <div className="col s10">
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let tag = ownProps.match ? ownProps.match.params.tag : undefined;
  if (tag !== undefined) {
    return {
      tag: tag,
      currentUser: state.auth.user,
      posts: state.posts,
      users: state.users.all,
      likes: state.likes,
      errors: state.errors,
    };
  } else {
    return {
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
