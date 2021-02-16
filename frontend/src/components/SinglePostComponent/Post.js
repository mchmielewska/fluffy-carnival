import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getLikes } from '../../actions/likesActions';
import { dateBuilder } from '../../utils/postUtils';
import AddComment from '../CommentComponent/AddComment';
import Comment from '../CommentComponent/Comment';
import { getComments } from '../../actions/commentsActions';
import AuthorSinglePostPage from './AuthorSinglePostPage';
import LikesForPost from '../PostCardComponent/LikesForPost';
import SinglePostImage from './SinglePostImage';
import PostActionPanel from './PostActionPanel';
import Login from '../LoginComponent/Login';

class Post extends Component {
  componentDidUpdate() {
    this.props.getLikes();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    const id = this.props.post.id;
    const likesProps = {
      id: id,
      ...this.props,
    };

    const post = this.props.post ? (
      <div>
        <h5 className="right-align post-title">{this.props.post.title}</h5>
        <div className="likes-panel-single-post">
          <LikesForPost {...likesProps} />
        </div>
        <div className="card horizontal">
          <AuthorSinglePostPage {...this.props} />
          <div className="card-stacked">
            <div className="card-content">
              <SinglePostImage {...this.props.post} />
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

    const comments = postComments.length
      ? postComments.map((singleComment) => {
          const singleCommentData = {
            author: singleComment.author,
            comment: singleComment.comment,
            id: singleComment._id,
            likes: singleComment.likes,
            publishDate: singleComment.publishDate,
            currentUser: this.props.currentUser,
            postId: this.props.post.id,
          };
          return <Comment {...singleCommentData} />;
        })
      : null;

    const authPage = (
      <div className="container">
        <div className="edit-links">
          <Link className="nav-link btn" to="/posts">
            <i className="material-icons left">keyboard_arrow_left</i>
            Back
          </Link>
          <PostActionPanel {...this.props} />
        </div>
        {post}
        <div className="comments-container" id="comments">
          {comments}
          <AddComment {...this.props} />
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.post_id;
  return {
    auth: state.auth,
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
    getLikes: () => {
      dispatch(getLikes());
    },
    getComments: (id) => {
      dispatch(getComments(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
