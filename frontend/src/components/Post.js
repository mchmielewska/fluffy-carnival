import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/postsActions';
import { getLikes, addLike, removeLike } from '../actions/likesActions';
import {
  dateBuilder,
  getAuthorForSinglePostPage,
  singlePostImage,
} from '../utils/postUtils';
import { likesPanel } from '../utils/likesUtils';
import AddComment from './AddComment';
import Comment from './Comment';
import { getComments } from '../actions/commentsActions';
class Post extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/posts/');
  };

  render() {
    const id = this.props.post.id;

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    function likePost(id, props, allLikes, users, currentUser) {
      const postLikes = allLikes.find((post) => post._id === id);
      if (postLikes) {
        const divId = 'div-' + id;
        for (let i in postLikes.likes) {
          if (postLikes.likes[i].user === currentUser.id) {
            return (
              <div id={divId}>
                <div className="likes-panel">
                  {likesPanel(id, props, allLikes, users)}
                  <button
                    className="like-button liked"
                    onClick={(e) => handleUnlike(e, id)}
                  >
                    <i className="small material-icons red-text">
                      favorite_border
                    </i>
                  </button>
                </div>
              </div>
            );
          }
        }

        return (
          <div id={divId}>
            <div className="likes-panel">
              {likesPanel(id, props, allLikes, users)}
              <button
                className="like-button"
                onClick={(e) => handleLike(e, id)}
              >
                <i className="small material-icons">favorite_border</i>
              </button>
            </div>
          </div>
        );
      } else {
        const divId = 'div-' + id;
        return (
          <div id={divId}>
            <div className="likes-panel">
              {likesPanel(id, props, allLikes, users)}
              <button
                className="like-button"
                onClick={(e) => handleLike(e, id)}
              >
                <i className="small material-icons">favorite_border</i>
              </button>
            </div>
          </div>
        );
      }
    }

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
    const allLikes = this.props.likes;
    const history = this.props.location.pathname
      ? this.props.location.pathname
      : '/';

    const post = this.props.post ? (
      <div>
        <h5 className="right-align post-title">{this.props.post.title}</h5>
        <div className="likes-panel-single-post">
          {likePost(id, this.props, allLikes, users, currentUser)}
        </div>
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

    this.props.getComments(id);
    const postComments = this.props.comments;
    console.log(postComments);

    const comments = postComments.length
      ? postComments.map((singleComment) => {
          const singleCommentData = {
            author: singleComment.author,
            comment: singleComment.comment,
            id: singleComment._id,
            publishDate: singleComment.publishDate,
            currentUser: this.props.currentUser,
            postId: this.props.post.id,
          };
          return <Comment {...singleCommentData} />;
        })
      : null;

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
        <div className="comments-container">
          {comments}
          <AddComment {...this.props} />
        </div>
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
    likes: state.likes,
    posts: state.posts,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id));
    },
    addLike: (id) => {
      dispatch(addLike(id));
    },
    removeLike: (id) => {
      dispatch(removeLike(id));
    },
    getLikes: () => {
      dispatch(getLikes());
    },
    getComments: (id) => {
      dispatch(getComments(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
