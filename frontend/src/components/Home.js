/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { cleanErrors } from '../actions/errorActions';
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

class Home extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history).bind(this);
  }

  componentDidMount() {
    this.props.cleanErrors();
  }

  render() {
    const image = 'https://i.imgur.com/I3SMZXj.png';
    const { isAuthenticated } = this.props.auth;
    const authPage = <Dashboard />;
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
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
  errors: state.errors
});

export default withRouter(connect(mapStateToProps, { cleanErrors, logoutUser })(Home));
