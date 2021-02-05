/*jshint esversion: 6 */

import React from 'react';
import { Link } from 'react-router-dom';

const GuestPage = () => {
  const image = 'https://i.imgur.com/I3SMZXj.png';
  const guestPage = (
    <div className="container center">
      <img className="main-img" src={image} alt="social media"></img>
      <br></br>
      <Link to="/register">Register</Link> or 
      <Link to="/login"> login as existing user</Link> to access the Fluffy
      Carnival page!
    </div>
  );

  return guestPage;
};

export default GuestPage;
