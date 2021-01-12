import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/usersActions';
import Sidebar from '../components/Sidebar';
import { inviteFriend } from '../actions/friendsActions';
import { userCard } from '../utils/userUtils';
class Users extends Component {
  render() {
    // state: { from: this.props.location.state }
    console.log(this.props.location);
    console.log(this.props.history)
    this.props.getUsers();
    const currentUser = this.props.currentUser;
    const friendsList = this.props.friendsList;
    const friendsIds = friendsList.map((el) => el._id);

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

    const users = this.props.users;

    const userList = users ? (
      users.map((user) => {
        return userCard(user, sendInvitation, this.props.location.pathname);
      })
    ) : (
      <div className="center">No users found</div>
    );

    return (
      <div className="row">
        <Sidebar {...this.props} />
        <div className="col s10">
          <div className="row center">{userList}</div>
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
    getUsers: () => {
      dispatch(getUsers());
    },
    inviteFriend: (id) => {
      dispatch(inviteFriend(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
