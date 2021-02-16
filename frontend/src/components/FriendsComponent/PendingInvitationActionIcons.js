import React, { Component } from 'react';
import { connect } from 'react-redux';
import { acceptInvite, declineInvite } from '../../actions/friendsActions';

class PendingInvitationActionIcons extends Component {
  render() {
    const handleClick = (token, action) => {
      if (action === 'accept') {
        this.props.acceptInvite(token);
      } else if (action === 'decline') {
        this.props.declineInvite(token);
      }
    };

    const invite = this.props.invite;
    const actions = this.props.actions;
    const actionPanel = (invite, actions) => {
      if (actions) {
        const token = invite.inviteToken;

        return (
          <div className="action-bar">
            <button
              className="material-icons action-button"
              onClick={(e) => handleClick(token, 'accept')}
            >
              <i className="material-icons tiny">check</i>
            </button>
            <button
              className="material-icons action-button"
              onClick={(e) => handleClick(token, 'decline')}
            >
              <i className="material-icons tiny">clear</i>
            </button>
          </div>
        );
      } else {
        return <div>invitation sent</div>;
      }
    };
    return actionPanel(invite, actions);
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptInvite: (token) => {
      dispatch(acceptInvite(token));
    },
    declineInvite: (token) => {
      dispatch(declineInvite(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingInvitationActionIcons);
