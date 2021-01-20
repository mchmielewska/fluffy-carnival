import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SidebarLinks from './SidebarLinks';
import { inviteFriend } from '../actions/friendsActions';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';
import { getLikes } from '../actions/likesActions';
import SinglePostCard from './SinglePostCard';
import UserProfileActionPanel from './UserProfileActionPanel';
import ProfileImage from './ProfileImage';

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
    this.props.getLikes();
  }

  render() {
    const allLikes = this.props.likes;
    const users = this.props.users;
    const currentUser = this.props.currentUser;

    const imageProps = {
      user: this.props.user,
      class: 'responsive-img',
    };

    const user = this.props.user ? (
      <div className="row center">
        <div className="col s12">
          <ProfileImage {...imageProps} />
        </div>

        <UserProfileActionPanel {...this.props} />
      </div>
    ) : (
      <div className="center">Loading user data...</div>
    );

    const userPosts = this.props.posts;

    const postList = userPosts.length ? (
      userPosts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          const props = {
            post: post,
            users: users,
            allLikes: allLikes,
            currentUser: currentUser,
            classList: 'col s6',
          };
          return <SinglePostCard {...props} key={post.id} />;
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
