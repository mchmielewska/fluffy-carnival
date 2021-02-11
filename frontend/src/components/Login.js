import React from 'react';
import LoginPanel from './LoginPanel';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    return (
        <div className="container-center">
            <div className="login-panel">
            <LoginPanel/>
            </div>
        </div>
    )
}

export default withRouter(Login);