import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';

class LogoutUser extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {

    return (
      <div className="sidebar-links sidebar-links-logout">
        <li className="nav-item">
          <a
            className="nav-link valign-wrapper"
            title="Logout"
            href="#"
            onClick={this.onLogout.bind(this)}
          >
            <i className="material-icons">exit_to_app</i>
            <span className="logout"> Logout</span>
          </a>
        </li>
      </div>
    );
  }
}

LogoutUser.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  currentUser: state.auth.user,
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
});

export default connect(mapStateToProps, { logoutUser })(LogoutUser);
