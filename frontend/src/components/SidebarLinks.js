import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarLinks() {
  return (
    <div className="sidebar-links">
      <Link className="link valign-wrapper" to="/post_add">
        <i className="material-icons">edit</i>Add post
      </Link>
      <Link className="link valign-wrapper" to="/posts">
        <i className="material-icons">home</i>Dashboard
      </Link>
      <Link className="link valign-wrapper" to="/friends/">
        <i className="material-icons">people</i>Friends
      </Link>
      <span className="valign-wrapper">
        <i className="material-icons">search</i>Explore
      </span>
      <Link className="link valign-wrapper" to="/posts/">
        <i className="material-icons white-text">navigate_next</i>Posts
      </Link>
      <Link className="link valign-wrapper" to="/users">
        <i className="material-icons white-text">navigate_next</i>People
      </Link>
    </div>
  );
}
