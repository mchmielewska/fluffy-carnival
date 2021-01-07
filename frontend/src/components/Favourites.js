import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../actions/postsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar';
import { getLikes, addLike, removeLike } from '../actions/likesActions';
import {
  postImage,
  dateBuilder,
  privacyLevelIcon,
  shortenDescription,
  readMore,
  getAuthor,
} from '../utils/postUtils';

class Favourites extends Component {
  render() {
    const posts = this.props.posts;

    const users = this.props.users;
    const allLikes = this.props.likes;
    const currentUser = this.props.currentUser.id;
    const postsLiked = allLikes.filter((post) => post.likes.length !== 0);

    let favouritesArray = [];

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    function checkForFavourites() {
      const allLikedPosts = allLikes.filter((post) => post.likes.length !== 0);
      const favouritesList = allLikedPosts.filter((post) =>
        post.likes.find((postLike) => postLike.user === currentUser)
      );
      for (let i in favouritesList) {
        const likedPost = posts.find(
          (post) => post.id === favouritesList[i]._id
        );
        favouritesArray.push(likedPost);
      }
      return favouritesArray;
    }

    const postsLikedByUser = checkForFavourites();

    function likePost(id) {
      const postLikes = allLikes.find((post) => post._id === id);
      if (postLikes) {
        for (let i in postLikes.likes) {
          if (postLikes.likes[i].user === currentUser) {
            return (
              <button
                className="like-button liked"
                onClick={(e) => handleUnlike(e, id)}
              >
                <i className="small material-icons red-text">favorite_border</i>
              </button>
            );
          }
        }

        return (
          <button className="like-button" onClick={(e) => handleLike(e, id)}>
            <i className="small material-icons">favorite_border</i>
          </button>
        );
      } else {
        return (
          <button className="like-button" onClick={(e) => handleLike(e, id)}>
            <i className="small material-icons">favorite_border</i>
          </button>
        );
      }
    }

    const postList = postsLiked.length ? (
      postsLikedByUser
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          return (
            <div className="col m4 s6" key={post.id}>
              <div className="post card">
                <div className="card-content row">
                  <div className="post-header left-align col m10">
                    {getAuthor(users, post)}
                  </div>
                  <div className="col m2 right-align">{likePost(post.id)}</div>
                </div>
                <div className="card-image">{postImage(post)}</div>
                <div className="card-content text">
                  <Link to={'/posts/' + post.id}>
                    <h6 className="card-title">{post.title}</h6>
                  </Link>
                  <p className="description">
                    {shortenDescription(post.description, 100)}
                  </p>
                  <p className="center-align">{readMore(post, 100)}</p>
                </div>
                <div className="card-action row">
                  <div className="user-details left-align col m10">
                    <p className="card-date">{dateBuilder(post.publishDate)}</p>
                  </div>
                  <div className="col m2 right-align privacy-level">
                    <span title={privacyLevelIcon(post.privacyLevel)}>
                      <i className="material-icons">
                        {privacyLevelIcon(post.privacyLevel)}
                      </i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
    ) : (
      <div className="center">No posts found</div>
    );

    return (
      <div className="row">
        <Sidebar />
        <div className="col s10">
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    posts: state.posts,
    users: state.users.all,
    likes: state.likes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getPosts());
    },
    getUsers: () => {
      dispatch(getUsers());
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
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Favourites));
