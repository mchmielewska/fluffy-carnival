import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';
import { getLikes } from '../actions/likesActions';
import UserPosts from './UserPosts';
import UserProfileSidebar from './UserProfileSidebar';
import UserPanel from './UserPanel';

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
    const user = this.props.user ? (
      <UserPanel {...this.props} />
    ) : (
      <div className="center">Loading user data...</div>
    );

    return (
      <div className="row">
        <UserProfileSidebar {...this.props} />

        <div className="col s9">
          <div className="row profile center">
            <div className="col m3">{user}</div>
            <UserPosts {...this.props} />
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
    getLikes: () => {
      dispatch(getLikes());
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
