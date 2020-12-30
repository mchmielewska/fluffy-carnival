import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postsActions';
import { getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar';
import { getLikes, addLike, removeLike } from '../actions/likesActions';

class Dashboard extends Component {
  render() {
    this.props.getUsers();
    this.props.getPosts();
    this.props.getLikes();

    const posts = this.props.posts;
    const users = this.props.users;
    const allLikes = this.props.likes;
    const currentUser = this.props.currentUser.id;

    function dateBuilder(date) {
      const event = new Date(date);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const newDate = `${event.toLocaleDateString(
        'en-EN',
        options
      )} ${event.toLocaleTimeString('en-US', { hour12: false })}`;
      return newDate;
    }

    function privacyLevelIcon(privacyLevel) {
      if (privacyLevel === 'public') {
        return 'public';
      } else if (privacyLevel === 'friendsOnly') {
        return 'people';
      } else if (privacyLevel === 'private') {
        return 'lock';
      }
    }

    function shortenDescription(text) {
      if (text.length > 100) {
        text = text.substring(0, 100) + '...';
        return text;
      }
    }

    function readMore(post) {
      if (post.description.length > 100) {
        return <Link to={'/posts/' + post.id}>read more</Link>;
      }
    }

    function profileImage(user) {
      if (user.profileImagePath === undefined) {
        return (
          <img
            className="responsive-img post-header"
            src="https://i.imgur.com/IJMRjcI.png"
            alt="profile"
          ></img>
        );
      } else {
        return (
          <img
            className="responsive-img post-header"
            src={user.profileImagePath}
            alt="profile"
          ></img>
        );
      }
    }

    function getAuthor(users, post) {
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === post.authorId) {
          const author = (
            <div className="row">
              <div className="col m2 post-header">{profileImage(users[i])}</div>
              <div className="col m10">
                <Link to={'/users/' + users[i]._id}>
                  <p className="bold">
                    {users[i].name} {users[i].surname}
                  </p>
                </Link>
                <p>{users[i].city}</p>
              </div>
            </div>
          );

          return author;
        }
      }
    }

    function postImage(post) {
      if (post.postImagePath === undefined) {
        return (
          <div className="image-container">
            <Link to={'/posts/' + post.id}>
              <img
                className="post-img"
                src="http://placekitten.com/300/300"
                alt="post"
              ></img>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="image-container">
            <Link to={'/posts/' + post.id}>
              <img
                className="post-img"
                src={post.postImagePath}
                alt="post"
              ></img>
            </Link>
          </div>
        );
      }
    }

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    function likePost(id) {
      const postLikes = allLikes.find((post) => post._id === id);

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
    }

    const postList = posts.length ? (
      posts
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
                    {shortenDescription(post.description)}
                  </p>
                  <p className="center-align">{readMore(post)}</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
