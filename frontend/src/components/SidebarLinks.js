import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class SidebarLinks extends Component {
  render() {
    const history = this.props.location ? this.props.location.pathname : '/';
    return (
      <div className="sidebar-links">
        <Link
          className="link valign-wrapper"
          to={{
            pathname: '/post_add',
            state: { from: history },
          }}
        >
          <i className="material-icons">edit</i>Add post
        </Link>
        <Link
          className="link valign-wrapper"
          to={{
            pathname: '/posts',
            state: { from: history },
          }}
        >
          <i className="material-icons">home</i>Dashboard
        </Link>
        <Link
          className="link valign-wrapper"
          to={{
            pathname: '/friends',
            state: { from: history },
          }}
        >
          <i className="material-icons">group</i>Friends
        </Link>
        <Link
          className="link valign-wrapper"
          to={{
            pathname: '/favourites',
            state: { from: history },
          }}
        >
          <i className="material-icons">favorite_border</i>Favourites
        </Link>
        <Link
          className="link valign-wrapper"
          to={{
            pathname: '/users',
            state: { from: history },
          }}
        >
          <i className="material-icons search">group_add</i>All users
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(SidebarLinks);
