import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inviteFriend } from '../actions/friendsActions';
import { Link } from 'react-router-dom';

class UserProfileActionPanel extends Component {
  render() {
    const friendsList = this.props.friendsList;
    const friendsIds = friendsList.map((el) => el._id);
    const currentUser = this.props.currentUser;
    const history = this.props.location.pathname
      ? this.props.location.pathname
      : '/';

    const getAge = () =>
      Math.floor(
        (new Date() - new Date(this.props.user.birthDate).getTime()) /
          3.15576e10
      );

    const handleInvite = (id) => {
      this.props.inviteFriend(id);
    };

    const isCurrentUser = (checkedUser, history) => {
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
    };

    const isAlreadyFriend = (user) => {
      if (friendsIds.includes(user._id)) {
        return (
          <p className="user-details uppercase">
            <i className="material-icons small">people</i>
            <br></br>
            my friend
          </p>
        );
      }
    };

    const sendInvitation = (user) => {
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
    };

    return (
      <div className="col s12">
        {isCurrentUser(this.props.user, history)}

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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user,
    likes: state.likes,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileActionPanel);
