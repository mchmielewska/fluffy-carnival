import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { inviteFriend } from '../actions/friendsActions';
import ProfileImage from './ProfileImage';

class UserCard extends Component {
  render() {
    const history = this.props.location.pathname;
    const currentUser = this.props.currentUser;
    const friendsList = this.props.friendsList;
    const friendsIds = friendsList.map((el) => el._id);
    const user = this.props.user;

    const handleInvite = (id) => {
      this.props.inviteFriend(id);
    };

    function sendInvitation(user) {
      if (user._id === currentUser || friendsIds.includes(user._id)) return;

      return (
        <button
          className="action-button"
          onClick={(e) => handleInvite(user._id)}
        >
          <i className="material-icons tiny">add_circle_outline</i> Add to
          friends
        </button>
      );
    }

    const getAge = (birthDate) =>
      Math.floor(
        (new Date() - new Date(user.birthDate).getTime()) / 3.15576e10
      );

    const imageProps = {
      user: this.props.user,
      class: 'responsive-img',
    };
    return (
      <div className="col m3" key={user._id}>
        <div className="card profile-card valign-wrapper">
          <ProfileImage {...imageProps} />
          <div className="user-details">
            <Link
              to={{
                pathname: '/users/' + user._id,
                state: { from: history },
              }}
            >
              <p className="bold username">
                {user.name} {user.surname}
              </p>
            </Link>
            <p className="small-text">
              {getAge()}, {user.city}
            </p>
            <div className="friends-counter">
              <span className="bold">{user.friends.length}</span>
              <br></br>
              <span className="uppercase">friends</span>
            </div>
            <div className="action">{sendInvitation(user)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user.id,
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inviteFriend: (id) => {
      dispatch(inviteFriend(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
