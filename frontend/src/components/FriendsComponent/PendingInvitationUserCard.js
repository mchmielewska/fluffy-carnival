import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFriend } from '../../actions/friendsActions';
import ProfileImage from '../ProfileImage';
import PendingInvitationActionIcons from './PendingInvitationActionIcons';

class PendingInvitationUserCard extends Component {
  render() {
    const handleRemove = (id) => {
      this.props.removeFriend(id);
    };

    const user = this.props.user;
    const invite = this.props.invite;
    const actionsAvailable = this.props.actions;

    const imageProps = {
      user: user,
      class: 'responsive-img',
    };

    const actionProps = {
      invite: invite,
      actions: actionsAvailable,
    };

    return (
      <div className="card profile-card valign-wrapper">
        <div>
          <ProfileImage {...imageProps} />
          <div className="user-details">
            <Link to={'/users/' + user._id}>
              <p className="bold">
                {user.name} {user.surname}
              </p>
            </Link>
            <p>{user.city}</p>

            <button
              className="material-icons action-button"
              onClick={(e) => handleRemove(user._id)}
            >
              <i className="material-icons tiny">remove_circle_outline</i>
              Remove invitation
            </button>
            <PendingInvitationActionIcons {...actionProps} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFriend: (id) => {
      dispatch(removeFriend(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingInvitationUserCard);
