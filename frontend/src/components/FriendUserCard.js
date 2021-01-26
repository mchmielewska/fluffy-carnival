import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFriend } from '../actions/friendsActions';
import ProfileImage from './ProfileImage';

class FriendUserCard extends Component {
  render() {
    const handleRemove = (id) => {
      this.props.removeFriend(id);
    };
    const friend = this.props.friend;
    const users = this.props.users;
    const checkedUser = users.find(
      (userFromList) => userFromList._id === friend._id
    );
    const imageProps = {
      user: checkedUser,
      class: 'responsive-img',
    };

    const getAge = () =>
      Math.floor(
        (new Date() - new Date(friend.birthDate).getTime()) / 3.15576e10
      );

    return (
      <div className="col m3" key={friend._id}>
        <div className="card profile-card valign-wrapper">
          <ProfileImage {...imageProps} />
          <div className="user-details">
            <Link to={'/users/' + friend._id}>
              {friend.id}
              <p className="bold username">
                {friend.name} {friend.surname}
              </p>
            </Link>
            <p>
              {getAge()}, {friend.city}
            </p>
          </div>
          <div className="action">
            <button
              className="action-button"
              onClick={(e) => handleRemove(friend._id)}
            >
              <i className="material-icons tiny">remove_circle_outline</i>
              Remove from friends
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.id,
    users: state.users.all,
    friends: state.friends.friendsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFriend: (id) => {
      dispatch(removeFriend(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendUserCard);
