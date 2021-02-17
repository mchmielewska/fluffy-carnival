import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import SearchField from './SearchComponent/SearchField';
import Menu from './MenuComponent/Menu';
import CurrentUser from './CurrentUserComponent/CurrentUser';
import LogoutUser from './LogoutUser';
import Logo from './Logo';
import { hideMenu, showElements, hideElements,  } from '../utils/menuUtils';

class Header extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    let isMenuHidden = true;

    if (window.matchMedia('(max-width: 60rem)').matches) {
      hideMenu();
    }

    const showMenu = (e) => {
      if (isMenuHidden) {
        hideElements();
        isMenuHidden = !isMenuHidden;
      } else {
        showElements();
        isMenuHidden = !isMenuHidden;
      }
    };

    const authLinks = (
      <ul className="navbar-nav right">
        <SearchField />
        <CurrentUser {...this.props} />
        <LogoutUser {...this.props} />
      </ul>
    );

    const authHeader = (
      <div>
        <div className="navbar-fixed">
          <nav className="nav-wrapper white">
            <div className="mobile-menu">
              <Logo />
              <button
                className="expand-menu-button btn"
                onClick={(e) => showMenu(e)}
              >
                menu
              </button>
              <div className="expand-menu">{authLinks}</div>
            </div>
            <Menu {...this.props} />
          </nav>
        </div>
      </div>
    );

    const guestHeader = (
      <nav className="nav-wrapper white">
        <div>
          <Logo />
        </div>
      </nav>
    );

    return isAuthenticated ? authHeader : guestHeader;
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
