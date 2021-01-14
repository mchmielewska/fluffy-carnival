import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/postsActions';
import {
  dateBuilder,
  getAuthorForSinglePostPage,
  singlePostImage,
} from '../utils/postUtils';
class Post extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/posts/');
  };

  render() {
    function postActionPanel(userId, postId, handleClick, history) {
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
          <button className="btn" onClick={handleClick}>
            Delete post
          </button>
        </div>
      );
    }

    const currentUser = this.props.currentUser;
    const users = this.props.users;
    const history = this.props.location.pathname
      ? this.props.location.pathname
      : '/';

    const post = this.props.post ? (
      <div>
        <h5 className="right-align post-title">{this.props.post.title}</h5>
        <div className="card horizontal">
          <div className="author">
            {getAuthorForSinglePostPage(users, this.props.post)}
          </div>
          <div className="card-stacked">
            <div className="card-content">
              {singlePostImage(this.props.post)}
              <p className="post-description">{this.props.post.description}</p>
            </div>
            <div className="card-action">
              <p className="post-date">
                {dateBuilder(this.props.post.publishDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        <div className="edit-links">
          <Link className="nav-link btn" to="/posts">
            <i className="material-icons left">keyboard_arrow_left</i>
            Back
          </Link>
          {postActionPanel(
            this.props.post.authorId,
            this.props.post.id,
            this.handleClick,
            history
          )}
        </div>
        {post}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.post_id;
  return {
    currentUser: state.auth.user,
    users: state.users.all,
    post: state.posts.find((post) => post.id === id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
