import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, getPostsByTag } from '../actions/postsActions';
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
  postTags,
} from '../utils/postUtils';
import { profileImage } from '../utils/userUtils';
import { getFriendsList } from '../actions/friendsActions';
import { cleanErrors } from '../actions/errorActions';
import Username from './Username';
import ReactDOMServer from 'react-dom/server';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    if (this.props.tag !== undefined) {
      let tag = this.props.tag;
      this.props.getPostsByTag(tag);
      this.setState({ tag: undefined });
    } else {
      this.props.getPosts(this.props.history);
    }

    this.props.getLikes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tag !== undefined) {
      let tag = this.props.tag;
      this.props.getPostsByTag(tag);
    } else {
      console.log('all posts');
      this.props.getPosts(this.props.history);
    }

    this.props.getLikes();
  }

  render() {
    const posts = this.props.posts;
    const users = this.props.users;
    const allLikes = this.props.likes;
    const currentUser = this.props.currentUser.id;

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    function getUserName(users, id, props) {
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === id) {
          return <Username users={props.users} id={id} />;
        }
      }
    }

    const showLikes = (e, id, postLikes, props) => {
      e.preventDefault();

      const divToShow = document.getElementById(id);
      // showDetails determines whether we should toggle current likes panel off, or
      //   whether we should turn the clicked panel on (and hide all the other ones)

      let targetElementVisible = !divToShow.classList.contains('hidden');

      if (targetElementVisible) {
        divToShow.classList.add('hidden');
      } else {
        const allLikesDivs = document.getElementsByClassName('likes-to-show');
        for (let i = 0; i < allLikesDivs.length; i++) {
          if (!allLikesDivs[i].classList.contains('hidden')) {
            allLikesDivs[i].classList.add('hidden');
          }
        }

        divToShow.classList.remove('hidden');
      }
    };

    const likesPanel = (id, props) => {
      const postLikes = allLikes.find((post) => post._id === id);
      const totalLikes = postLikes.likes.length;

      const likes = postLikes.likes.map((like) => {
        const user = getUserName(users, like.user, props);
        console.log(user);

        return <div>{user}</div>;
      });

      const likesButton = totalLikes ? (
        <div>
          <div className="likes-to-show hidden" id={id}>
            {likes}
          </div>
          <button
            className="likes-panel-button like-button"
            onClick={(e) => showLikes(e, id, postLikes, props)}
          >
            {totalLikes}
          </button>
        </div>
      ) : null;

      return likesButton;
    };

    function likePost(id, props) {
      const postLikes = allLikes.find((post) => post._id === id);
      if (postLikes) {
        const divId = 'div-' + id;
        for (let i in postLikes.likes) {
          if (postLikes.likes[i].user === currentUser) {
            return (
              <div id={divId}>
                <div className="likes-panel">
                  {likesPanel(id, props)}
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
              {likesPanel(id, props)}
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
              {likesPanel(id, props)}
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

    const postList = posts.length ? (
      posts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          return (
            <div className="col m4 s6" key={post.id}>
              <div className="post card">
                <div className="card-content row">
                  <div className="post-header left-align col m9">
                    {getAuthor(users, post)}
                  </div>
                  <div className="col m3 right-align">
                    {likePost(post.id, this.props)}
                  </div>
                </div>
                <div className="card-image">{postImage(post)}</div>
                <div className="row tags">
                  <div className="user-details">{postTags(post)}</div>
                </div>
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
        <Sidebar {...this.props} />
        <div className="col s10">
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let tag = ownProps.match ? ownProps.match.params.tag : undefined;
  if (tag !== undefined) {
    return {
      tag: tag,
      currentUser: state.auth.user,
      posts: state.posts,
      users: state.users.all,
      likes: state.likes,
      errors: state.errors,
    };
  } else {
    return {
      currentUser: state.auth.user,
      posts: state.posts,
      users: state.users.all,
      likes: state.likes,
      errors: state.errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (history) => {
      dispatch(getPosts(history));
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
    getPostsByTag: (tag) => {
      dispatch(getPostsByTag(tag));
    },
    cleanErrors: () => {
      dispatch(cleanErrors());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
