import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class PostAdded extends Component {
    render() {
        return (
            <div className="container">
                <div className="center text-center">
                    <h4>Post created!</h4>
                    <Link className="link" to="/dashboard">Go back to Dashboard page</Link>
                </div>
            </div>
        )
    }
}