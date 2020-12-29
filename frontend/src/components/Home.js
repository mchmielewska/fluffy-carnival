/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

class Home extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const image = 'https://i.imgur.com/I3SMZXj.png';
    const { isAuthenticated, user } = this.props.auth;
    const authPage = (
      <div className="row">
        <Sidebar />
        <div className="col s9 center-align">
          <img
            className="main-img"
            src="https://i.imgur.com/sOY7tje.jpg"
            alt="social media"
            width="50%"
          ></img>
        </div>
      </div>
    );
    const guestPage = (
      <div className="container center">
        <img className="main-img" src={image} alt="social media"></img>
        <br></br>
        <Link to="/register">Register</Link> or{' '}
        <Link to="/login">login as existing user</Link> to access the Fluffy
        Carnival page!
      </div>
    );

    return (
      <div>
        <div>{isAuthenticated ? authPage : guestPage}</div>
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
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Home));
