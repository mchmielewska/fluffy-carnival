/*jshint esversion: 6 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { store } from '../store';
import { getUsers, getCurrentUser } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';
import { getFriendsList, getPendingInvites } from '../actions/friendsActions';
import { getLikes } from '../actions/likesActions';
import { cleanErrors } from '../actions/errorActions';
import { setPath } from '../actions/authentication';

class LoginPanel extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const previousLocation = this.props.previousLocation
      ? this.props.previousLocation.pathname
      : this.props.auth.path;
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(user, previousLocation);
    this.props.cleanErrors();
  }

  componentDidMount() {
    const previousLocation = this.props.previousLocation
      ? this.props.previousLocation.pathname
      : this.props.auth.path;

    if (this.props.auth.isAuthenticated && previousLocation) {
      this.props.cleanErrors();
      this.props.setPath(previousLocation);
    }
  }

  render() {
    const previousLocation = this.props.previousLocation
      ? this.props.previousLocation.pathname
      : this.props.auth.path;
    // this.props.setPath(previousLocation);
    const error = this.props.errors;
    const showError = error ? (
      <div className="error">{error.message || 'unknown error'}</div>
    ) : null;

    return (
        <div className="container center">
            {/* <h5 style={{ marginBottom: '40px' }}>Login to Fluffy Carnival</h5> */}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className={classnames('form-control form-control-lg')}
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className={classnames('form-control form-control-lg')}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
              </div>
              <div className="form-group">
                {showError}
                <button
                  type="submit"
                  className="btn btn-primary "
                  style={{ justifyContent: 'center' }}
                >
                  Login User{' '}
                  <i className="material-icons right">chevron_right</i>
                </button>
              </div>
              <div className="form-group">
                <Link to="/resetpassword" className="link">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
    );
  }
}

LoginPanel.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user, previousLocation) =>
      dispatch(loginUser(user, previousLocation)),
    cleanErrors: () => dispatch(cleanErrors()),
    setPath: (previousLocation) => dispatch(setPath(previousLocation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);
