import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import SearchField from './SearchComponent/SearchField';
import Menu from './MenuComponent/Menu';
import CurrentUser from './CurrentUserComponent/CurrentUser';
import MobileLinks from  './MenuComponent/MobileLinks'
import { asyncLocalStorage } from 'redux-persist/storages';

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

    let isMenuHidden = true;

    if (window.matchMedia('(max-width: 60rem)').matches) {
      const menu = document.getElementsByClassName('expand-menu')[0];
      const divToShow = document.getElementById('current-user');
      const nav = document.getElementsByClassName('nav-wrapper')[0];
      const sidebar = document.getElementsByClassName('sidebar')[0];
      const logo = document.getElementById('logo');
      const button = document.getElementsByClassName('expand-menu-button')[0];
      if (menu) {
        menu.style.display = 'none';
        sidebar.classList.remove('hidden');
        logo.classList.remove('hidden')
        divToShow.classList.add('hidden');
        nav.classList.remove('unfixed');
        button.innerHTML = "Menu"
      };
    }

    const showMenu = (e) => {
      const menu = document.getElementsByClassName('expand-menu')[0];
      const divToShow = document.getElementById('current-user');
      const nav = document.getElementsByClassName('nav-wrapper')[0];
      const sidebar = document.getElementsByClassName('sidebar')[0];
      const logo = document.getElementById('logo');
      const button = document.getElementsByClassName('expand-menu-button')[0];

      if (isMenuHidden) {
        menu.style.display = 'flex';
        divToShow.classList.remove('hidden');
        sidebar.classList.add('hidden');
        logo.classList.add('hidden');
        nav.classList.add('unfixed');
        button.innerHTML = ">";

        isMenuHidden = !isMenuHidden;
      } else {
        menu.style.display = 'none';
        sidebar.classList.remove('hidden');
        logo.classList.remove('hidden')
        divToShow.classList.add('hidden');
        nav.classList.remove('unfixed');
        button.innerHTML = "Menu"
        isMenuHidden = !isMenuHidden;
      }
    };

    const authLinks = (
      <ul className="navbar-nav right">
        <SearchField />
        <CurrentUser {...this.props} />
        
        <div className="sidebar-links sidebar-links-logout">
        <li className="nav-item">
          <a
            className="nav-link valign-wrapper"
            title="Logout"
            href="#"
            onClick={this.onLogout.bind(this)}
          >
            <i className="material-icons">exit_to_app</i><span className="logout"> Logout</span>
          </a>
        </li>
        </div>
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
      <div>
        <div className="navbar-fixed">
          <nav className="nav-wrapper white">
            <div className="mobile-menu">
              <Link className="brand-logo" to="/">
                <img
                  id="logo"
                  src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1612963806/fluffy_z4bue1.png"
                  alt="logo"
                ></img>
              </Link>
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
          <Link className="brand-logo" to="/">
            <img
              id="logo"
              src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1612963806/fluffy_z4bue1.png"
              alt="logo"
            ></img>
          </Link>
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
