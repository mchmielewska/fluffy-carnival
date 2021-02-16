/*jshint esversion: 6 */

import React from 'react';
import { Link } from 'react-router-dom';
import LoginPanel from './LoginComponent/LoginPanel';

const GuestPage = () => {
  const guestPage = (
    <div className="container center">
      <div className="row guest-page">
        <div className="col m6 s12">
          <h1>fluffy carnival</h1>
        </div>
        <div className="col m6 s12">
          <div className="login-panel">
            <LoginPanel />
          </div>
          <div className="register-container">
            You don't have an account?
            <Link className="btn" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return guestPage;
};

export default GuestPage;
