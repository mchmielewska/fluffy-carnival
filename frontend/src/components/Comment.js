import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateBuilder, getAuthorForSinglePostPage } from '../utils/postUtils';
import {
  deleteComment,
  likeComment,
  unlikeComment,
} from '../actions/commentsActions';
class Comment extends Component {
  render() {
    const commentAuthorId = this.props.author;
    const postId = this.props.postId;
    const commentId = this.props.id;

    const handleRemove = (e, postId, commentId) => {
      e.preventDefault();
      this.props.deleteComment(postId, commentId);
    };

    const commentLikes = () => {
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

    const handleLike = (e, postId, commentId) => {
      e.preventDefault();
      this.props.likeComment(postId, commentId);
    };

    const handleUnlike = (e, postId, commentId) => {
      e.preventDefault();
      this.props.unlikeComment(postId, commentId);
    };

    const commentsActionPanel = (userId, currentUser) => {
      if (userId !== currentUser) {
        return <div className="right-align">{commentLikes()}</div>;
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
          {commentLikes()}
        </div>
      );
    };
    const users = this.props.users;
    const currentUser = this.props.currentUser.id;
    return (
      <div key={this.props.id} className="single-comment card horizontal">
        <div className="author">
          {getAuthorForSinglePostPage(users, this.props)}
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{this.props.comment}</p>
          </div>
          <div className="card-action row">
            <div className="col m9">
              <p className="post-date">{dateBuilder(this.props.publishDate)}</p>
            </div>
            <div className="col m3">
              {commentsActionPanel(commentAuthorId, currentUser)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (postId, commentId) => {
      dispatch(deleteComment(postId, commentId));
    },
    likeComment: (postId, commentId) => {
      dispatch(likeComment(postId, commentId));
    },
    unlikeComment: (postId, commentId) => {
      dispatch(unlikeComment(postId, commentId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
