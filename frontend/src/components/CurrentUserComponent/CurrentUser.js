import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/usersActions';
import { getFriendsList } from '../../actions/friendsActions';
import CurrentUserDetails from './CurrentUserDetails';
import CurrentUserProfileImage from './CurrentUserProfileImage';
import MobileLinks from '../MenuComponent/MobileLinks'

class CurrentUser extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.getFriendsList();
  }
  componentDidUpdate() {
    this.props.getCurrentUser();
    this.props.getFriendsList();
  }

  render() {
    const divToShow = document.getElementById('current-user');
    if (divToShow) divToShow.classList.add('hidden');

    const currentUser = this.props.user;
    const friends = this.props.friends;
    const id = this.props.id;
    const detailsProps = {
      currentUser,
      friends,
      id: id,
      location: this.props.location
    };

    const location = this.props.location ? this.props.location.pathname : '/';
    const profileImageProps = {
      currentUser: currentUser,
      history: location,
      id: id,
    };
    const profileData = currentUser ? (
      <div id="current-user" className="hidden">
        <div className="center-align details-container">
          <Link
            to={{
              pathname: `/users/${id}`,
              state: { from: this.props.location.pathname },
            }}
          >
            <CurrentUserProfileImage {...profileImageProps} />
          </Link>
          <CurrentUserDetails {...detailsProps} />
        </div>

        <div className="sidebar-links">
          <Link
            title="profile"
            className="valign-wrapper"
            to={{
              pathname: `/users/${id}`,
              state: { from: this.props.location.pathname },
            }}
          >
            <i className="material-icons">person</i> Profile
          </Link>
          <MobileLinks />
        </div>
      </div>
    ) : (
      <div className="center-align">
        <p>Loading user data...</p>
      </div>
    );

    const showUserData = (e) => {
      e.preventDefault();
      const divToShow = document.getElementById('current-user');

      if (divToShow.classList.contains('hidden')) {
        divToShow.classList.remove('hidden');
      } else {
        divToShow.classList.add('hidden');
      }
    };

    const userData = currentUser ? (
      <div>
        <div className="user-menu">
          <i className="material-icons">person</i>{' '}
          <span>Hello, {currentUser.user.name}! </span>
          <button
            className="btn user-data-button"
            onClick={(e) => showUserData(e)}
          >
            <i className="material-icons">expand_more</i>
          </button>
        </div>
        {profileData}
      </div>
    ) : (
      <div></div>
    );

    return userData;
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
    getFriendsList: () => {
      dispatch(getFriendsList())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
