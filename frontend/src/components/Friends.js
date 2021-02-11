import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFriendsList, getPendingInvites } from '../actions/friendsActions';
import Sidebar from '../components/Sidebar';
import FriendUserCard from './FriendUserCard';
import PendingInvitationUserCard from './PendingInvitationUserCard';
import Login from './Login';

class Friends extends Component {
  componentDidUpdate() {
    this.props.getFriendsList();
    this.props.getPendingInvites();
  }
  render() {
    const users = this.props.users;
    const currentUser = this.props.currentUser;

    const { isAuthenticated } = this.props.auth;

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    this.props.getFriendsList();
    this.props.getPendingInvites();

    const friends = this.props.friends;
    const pendingInvites = this.props.pendingInvites;

    function checkFriendship(friendship, currentUser) {
      if (friendship.requestor === currentUser) {
        return {
          id: friendship.requested,
          actionsAvailable: false,
        };
      } else if (friendship.requested === currentUser) {
        return {
          id: friendship.requestor,
          actionsAvailable: true,
        };
      }
    }

    const pendingInvitesList = pendingInvites.length ? (
      pendingInvites.map((invite) => {
        const userId = checkFriendship(invite, currentUser).id;
        const actions = checkFriendship(invite, currentUser).actionsAvailable;
        const user = users.find((user) => user._id === userId);
        const userProps = {
          user: user,
          invite: invite,
          actions: actions,
          ...this.props,
        };
        return (
          <div className="col m3" key={invite.id}>
            <PendingInvitationUserCard {...userProps} key={user._id} />
          </div>
        );
      })
    ) : (
      <div className="center">No pending invites</div>
    );

    const friendsList = friends.length ? (
      friends.map((friend) => {
        const friendProps = {
          friend: friend,
          ...this.props,
        };
        return <FriendUserCard {...friendProps} key={friend._id} />;
      })
    ) : (
      <div className="center">No friends found</div>
    );

    const authPage = (
      <div className="row">
        <div className="col">
          <div className="row center">
            <h5 className="left-align">Pending invites:</h5>
            {pendingInvitesList}
          </div>
          <div className="row center">
            <h5 className="left-align">Friends:</h5>
            {friendsList}
          </div>
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentUser: state.auth.user.id,
    users: state.users.all,
    friends: state.friends.friendsList,
    pendingInvites: state.friends.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFriendsList: () => {
      dispatch(getFriendsList());
    },
    getPendingInvites: () => {
      dispatch(getPendingInvites());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Friends)
);
