import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CurrentUser extends Component {
  render() {
    function profileImage(user) {
      if (user.profileImagePath === undefined) {
        return (
          <img
            className="responsive-img"
            src="https://i.imgur.com/IJMRjcI.png"
            alt="profile"
          ></img>
        );
      } else {
        return (
          <img
            className="responsive-img"
            src={user.profileImagePath}
            alt="profile"
          ></img>
        );
      }
    }

    const currentUser = this.props.user;
    const friends = this.props.friends;
    const id = this.props.id;
    const profileData = currentUser ? (
      <div>
        <div className="center-align row">
          {profileImage(currentUser.user)}
          <div className="user-details">
            <p className="username">
              {currentUser.user.name} {currentUser.user.surname}
            </p>
            <p>{currentUser.user.city}</p>
            <div className="row center-align">
              <div className="col m6">
                <p>
                  <span className="bold">{currentUser.posts.length}</span>
                  <br></br>
                  <span className="uppercase">posts</span>
                </p>
              </div>
              <div className="col m6">
                <p>
                  <span className="bold">{friends.length}</span>
                  <br></br>
                  <span className="uppercase">friends</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-links row">
          <Link
            className="valign-wrapper"
            to={{
              pathname: `/users/${id}`,
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

export default connect(mapStateToProps)(CurrentUser);
