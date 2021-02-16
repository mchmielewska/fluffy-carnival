import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/commentsActions';
import CommentLikes from './CommentLikes';

class CommentsActionPanel extends Component {
  render() {
    const postId = this.props.postId;
    const commentId = this.props.id;

    const handleRemove = (e, postId, commentId) => {
      e.preventDefault();
      this.props.deleteComment(postId, commentId);
    };

    const panel = (userId, currentUser) => {
      if (userId !== currentUser) {
        return (
          <div className="right-align">
            <CommentLikes {...this.props} />
          </div>
        );
      }

      return (
        <div className="right-align">
          <button
            className="btn comments-action"
            onClick={(e) => handleRemove(e, postId, commentId)}
            title="remove comment"
          >
            <i className="material-icons">clear</i>
          </button>
          <CommentLikes {...this.props} />
        </div>
      );
    };

    return (
      <div className="col m3">
        {panel(this.props.author, this.props.currentUser.id)}
      </div>
    );
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
    deleteComment: (postId, commentId) => {
      dispatch(deleteComment(postId, commentId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsActionPanel);
