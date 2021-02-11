/*jshint esversion: 6 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { cleanErrors } from '../actions/errorActions';
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import GuestPage from './GuestPage';

class Home extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history).bind(this);
  }

  componentDidMount() {
    this.props.cleanErrors();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div>{isAuthenticated ? <Dashboard /> : <GuestPage />}</div>
      </div>
      
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { cleanErrors, logoutUser })(Home)
);
