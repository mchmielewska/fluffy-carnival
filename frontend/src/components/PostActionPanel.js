import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/postsActions';
import { Link } from 'react-router-dom';

class PostActionPanel extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/posts/');
  };

  render() {
    const history = this.props.location.pathname
      ? this.props.location.pathname
      : '/';
    const currentUser = this.props.currentUser;
    const authorId = this.props.post.authorId;
    const postId = this.props.post.id;

    const panel = (userId, postId, history) => {
      if (userId !== currentUser.id) return '';

      return (
        <div className="right-align">
          <Link
            className="btn"
            to={{
              pathname: `/posts/${postId}/edit`,
              state: { from: history },
            }}
          >
            Edit post
          </Link>
          <button className="btn" onClick={this.handleClick}>
            Delete post
          </button>
        </div>
      );
    };

    return panel(authorId, postId, history);
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostActionPanel);
