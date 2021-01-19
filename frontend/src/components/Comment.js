import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateBuilder, getAuthorForSinglePostPage } from '../utils/postUtils';
import { deleteComment } from '../actions/commentsActions';
class Comment extends Component {
  render() {
    const commentAuthorId = this.props.author;
    const postId = this.props.postId;
    const commentId = this.props.id;

    const handleRemove = (e, postId, commentId) => {
      e.preventDefault();
      this.props.deleteComment(postId, commentId);
    };

    function commentsActionPanel(userId, currentUser, handleRemove) {
      if (userId !== currentUser)
        return (
          <div className="right-align">
            <button className="btn comments-action">
              <i className="material-icons">favorite_border</i>
            </button>
          </div>
        );

      return (
        <div className="right-align">
          <button className="btn comments-action">
            <i className="material-icons">favorite_border</i>
          </button>
          <button
            className="btn comments-action"
            onClick={(e) => handleRemove(e, postId, commentId)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      );
    }
    console.log(this.props);
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
              {commentsActionPanel(commentAuthorId, currentUser, handleRemove)}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
