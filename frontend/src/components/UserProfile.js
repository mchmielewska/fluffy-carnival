import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SidebarLinks from './SidebarLinks';
import { inviteFriend } from '../actions/friendsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';
import { getLikes, addLike, removeLike } from '../actions/likesActions';
import { shortenDescription, readMore, postImage } from '../utils/postUtils';
import { profileImage } from '../utils/userUtils';
import { likePost } from '../utils/likesUtils';
import PostDetails from './PostDetails';

class UserProfile extends Component {
  componentDidMount() {
    const previousPathObject = this.props.location.state;
    const previousPath = previousPathObject ? previousPathObject.from : '/';
    if (previousPath.includes('tags')) {
      console.log('reloading posts');
      this.props.getPosts(this.props.history);
    }
    this.props.getUsers();
    this.props.getLikes();
  }

  componentDidUpdate() {
    this.props.getUsers();
  }

  render() {
    const friendsList = this.props.friendsList;
    const friendsIds = friendsList.map((el) => el._id);
    const allLikes = this.props.likes;
    const users = this.props.users;

    const currentUser = this.props.currentUser;

    const getAge = (birthDate) =>
      Math.floor(
        (new Date() - new Date(this.props.user.birthDate).getTime()) /
          3.15576e10
      );

    const handleInvite = (id) => {
      this.props.inviteFriend(id);
    };

    function isCurrentUser(checkedUser, history) {
      if (checkedUser._id === currentUser.id) {
        return (
          <Link
            className="action-button"
            to={{
              pathname: `/users/${checkedUser._id}/edit`,
              state: { from: history },
            }}
          >
            <i className="material-icons tiny">edit</i>Edit profile
          </Link>
        );
      }
    }

    function isAlreadyFriend(user) {
      if (friendsIds.includes(user._id)) {
        return (
          <p className="user-details uppercase">
            <i className="material-icons small">people</i>
            <br></br>
            my friend
          </p>
        );
      }
    }

    function sendInvitation(user) {
      if (user._id === currentUser.id || friendsIds.includes(user._id)) return;

      return (
        <button
          className="action-button center"
          onClick={(e) => handleInvite(user._id)}
        >
          <i className="material-icons tiny">add_circle_outline</i> Add to
          friends
        </button>
      );
    }

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    const history = this.props.location.pathname
      ? this.props.location.pathname
      : '/';
    const user = this.props.user ? (
      <div className="row center">
        <div className="col s12">
          {profileImage(this.props.user, 'responsive-img')}
        </div>

        <div className="col s12">{isCurrentUser(this.props.user, history)}</div>

        <div className="col s12">
          <p className="bold username">
            {this.props.user.name} {this.props.user.surname}
          </p>
          <p>
            {getAge()}, {this.props.user.city}
          </p>
          <p>
            <span className="bold">{this.props.user.friends.length}</span>
            <br></br>
            <span className="uppercase">friends</span>
          </p>
          {isAlreadyFriend(this.props.user)}
          <p className="user-details-flex">{sendInvitation(this.props.user)}</p>
        </div>
      </div>
    ) : (
      <div className="center">Loading user data...</div>
    );

    const userPosts = this.props.posts;

    const postList = userPosts.length ? (
      userPosts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          return (
            <div className="col s6" key={post.id}>
              <div className="post card">
                <div className="card-content row">
                  <div className="col s12 right-align">
                    {likePost(
                      post.id,
                      this.props,
                      allLikes,
                      users,
                      currentUser,
                      handleLike,
                      handleUnlike
                    )}
                  </div>
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

                <PostDetails {...post} />
              </div>
            </div>
          );
        })
    ) : (
      <div className="center">No posts found</div>
    );

    return (
      <div className="row">
        <div className="col m2">
          <button
            className="nav-link btn btn-primary"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <i className="material-icons left">keyboard_arrow_left</i>
            Back
          </button>
          <SidebarLinks {...this.props} />
        </div>

        <div className="col s9">
          <div className="row profile center">
            <div className="col m3">{user}</div>
            <div className="col m9">{postList}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.user_id;
  return {
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user,
    id: id,
    user: state.users.all.find((user) => user._id === id),
    posts: state.posts.filter((post) => post.authorId === id),
    likes: state.likes,
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inviteFriend: (id) => {
      dispatch(inviteFriend(id));
    },
    getLikes: () => {
      dispatch(getLikes());
    },
    addLike: (id) => {
      dispatch(addLike(id));
    },
    removeLike: (id) => {
      dispatch(removeLike(id));
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    getUsers: () => {
      dispatch(getUsers());
    },
    getPosts: (history) => {
      dispatch(getPosts(history));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);
