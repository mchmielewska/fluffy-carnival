import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';
import { getLikes } from '../actions/likesActions';
import UserPosts from './UserPosts';
import UserProfileSidebar from './UserProfileSidebar';
import UserPanel from './UserPanel';
import Login from './Login';
import { MetroSpinner } from 'react-spinners-kit';

class UserProfile extends Component {
  componentDidMount() {
    const previousPathObject = this.props.location.state;
    const previousPath = previousPathObject ? previousPathObject.from : '/';
    if (previousPath.includes('tags')) {
      this.props.getPosts(this.props.history);
    }
    this.props.getUsers();
    this.props.getLikes();
    this.setState({ loading: false });
  }

  componentDidUpdate() {
    this.props.getUsers();
    this.props.getLikes();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const loadingData = this.props.loading;
    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    const user = this.props.user ? (
      <UserPanel {...this.props} />
    ) : (
      <div className="center spinner">
        <MetroSpinner size={50} color="#CCCCCC" loading={loadingData} />
      </div>
    );

    const authPage = (
      <div className="container">
        <div className="row profile center">
          <div className="col m12">{user}</div>
          <UserPosts {...this.props} />
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.user_id;
  let loading = true;

  if (state.posts && state.posts.length > 0) {
    loading = false;
  }

  return {
    auth: state.auth,
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user,
    id: id,
    user: state.users.all.find((user) => user._id === id),
    posts: state.posts.filter((post) => post.authorId === id),
    likes: state.likes,
    users: state.users.all,
    loading: loading,
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
