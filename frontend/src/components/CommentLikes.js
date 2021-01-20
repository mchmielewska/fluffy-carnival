import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likeComment, unlikeComment } from '../actions/commentsActions';

class CommentLikes extends Component {
  render() {
    const handleLike = (e, postId, commentId) => {
      e.preventDefault();
      this.props.likeComment(postId, commentId);
    };

    const handleUnlike = (e, postId, commentId) => {
      e.preventDefault();
      this.props.unlikeComment(postId, commentId);
    };

    const currentUser = this.props.currentUser.id;

    const commentLikes = (postId, commentId) => {
      const commentLikes = this.props.likes;
      if (commentLikes.length) {
        for (let i in commentLikes) {
          console.log(commentLikes[i].user === currentUser);
          if (commentLikes[i].user === currentUser) {
            return (
              <button
                className="btn comments-action liked"
                onClick={(e) => handleUnlike(e, postId, commentId)}
                title="unlike comment"
              >
                <i className="material-icons">favorite_border</i>
              </button>
            );
          }
          return (
            <button
              className="btn comments-action"
              onClick={(e) => handleLike(e, postId, commentId)}
              title="like comment"
            >
              <i className="material-icons">favorite_border</i>
            </button>
          );
        }
      } else {
        return (
          <button
            className="btn comments-action"
            onClick={(e) => handleLike(e, postId, commentId)}
            title="like comment"
          >
            <i className="material-icons">favorite_border</i>
          </button>
        );
      }
    };

    return <span>{commentLikes(this.props.postId, this.props.id)}</span>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeComment: (postId, commentId) => {
      dispatch(likeComment(postId, commentId));
    },
    unlikeComment: (postId, commentId) => {
      dispatch(unlikeComment(postId, commentId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentLikes);
