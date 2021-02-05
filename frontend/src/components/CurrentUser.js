import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/usersActions';
import CurrentUserDetails from './CurrentUserDetails';
import CurrentUserProfileImage from './CurrentUserProfileImage';

class CurrentUser extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  componentDidUpdate() {
    this.props.getCurrentUser();
  }

  render() {
    const currentUser = this.props.user;
    const friends = this.props.friends;
    const id = this.props.id;
    const detailsProps = {
      currentUser,
      friends,
    };
    const location = this.props.location ? this.props.location.pathname : '/';
    const profileImageProps = {
      currentUser: currentUser,
      history: location,
      id: id,
    };
    const profileData = currentUser ? (
      <div>
        <div className="center-align row">
        <Link
            to={{
              pathname: `/users/${id}`,
              state: { from: this.props.location.pathname },
            }}
          >
          <CurrentUserProfileImage {...profileImageProps} />
          <CurrentUserDetails {...detailsProps} />
          </Link>
        </div>

        <div className="sidebar-links row">
          <Link
            className="valign-wrapper"
            to={{
              pathname: `/users/${id}`,
              state: { from: this.props.location.pathname },
            }}
          >
            <i className="material-icons">person</i>Profile
          </Link>
        </div>
      </div>
    ) : (
      <div className="center-align">
        <img
          className="responsive-img"
          src="https://i.imgur.com/IJMRjcI.png"
          alt="profile"
        ></img>
        <p>Loading user data...</p>
      </div>
    );

    return profileData;
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.user.id,
    user: state.users.currentUser,
    users: state.users.all,
    friends: state.friends.friendsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
