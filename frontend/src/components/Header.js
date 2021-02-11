import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import SearchField from './SearchField';
import jwt_decode from 'jwt-decode';
import Sidebar from './Sidebar';
import CurrentUser from './CurrentUser'

class Header extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  // componentDidMount() {
  //   if (localStorage.jwtToken) {
  //     const decoded = jwt_decode(localStorage.jwtToken);
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       this.props.logoutUser(this.props.history);
  //     }
  //   }
  // }

  render() {
    const { isAuthenticated, user } = this.props.auth;
  
    const authLinks = (
      <ul className="navbar-nav right">
        <SearchField />
        <CurrentUser {...this.props}/>
        <li className="nav-item">
          <a className="nav-link" title="Logout" href="#" onClick={this.onLogout.bind(this)}>
            <i className="material-icons">exit_to_app</i>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav right">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );

    const authHeader = (
      <div className="navbar-fixed">
<nav className="nav-wrapper white">
      <div>
      <Link className="brand-logo" to="/">
          <img id="logo" src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1612963806/fluffy_z4bue1.png" alt="logo"></img>
        </Link>
        <div>
          { authLinks }
        </div>
      </div>
        <Sidebar {...this.props}/>
      </nav>
      </div>
      
    )

    const guestHeader = (
      <nav className="nav-wrapper white">
      <div>
      <Link className="brand-logo" to="/">
          <img id="logo" src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1612963806/fluffy_z4bue1.png" alt="logo"></img>
        </Link>
      </div>
      </nav>
    )
    
    return (
          isAuthenticated ? authHeader : guestHeader
    );
  }
}
Header.propTypes = {
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

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
