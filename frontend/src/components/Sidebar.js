import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar col s2 right">
                <div className="center-align">
                    <h5>Hello logged user!</h5>
                    <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                    <div>
                        <p>name surname</p>
                        <p>location</p>
                    </div>
                    <br></br>
        
                    <Link className="link" to="/dashboard">Go back to Dashboard page</Link>
                </div>
            </div>
        )
    }
}