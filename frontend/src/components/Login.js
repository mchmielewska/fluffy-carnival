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
class Login extends Component {
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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
    this.props.cleanErrors();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
      store.dispatch(getCurrentUser());
      store.dispatch(getUsers());
      store.dispatch(getPosts());
      store.dispatch(getLikes());
      store.dispatch(getFriendsList());
      store.dispatch(getPendingInvites());
    }
  }

  render() {
    const error = this.props.errors;
    const showError = error ? (
      <div className="error">{ error.msg }</div>) : null;

    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col m6">
            <img
              className="main-img"
              src="https://i.imgur.com/isTc8fu.png"
              alt="login"
              width="100%"
            ></img>
          </div>
          <div className="col m6">
            <h5 style={{ marginBottom: '40px' }}>Login to Fluffy Carnival</h5>
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
              { showError }
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
                <Link to="/resetpassword" className="link right">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  users: state.users.all,
  likes: state.likes,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => { return {
  loginUser: (user) => dispatch(loginUser(user)),
  cleanErrors: () => dispatch(cleanErrors())
}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
