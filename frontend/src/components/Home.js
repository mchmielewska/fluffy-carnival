/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const image = "https://cdn.shopify.com/s/files/1/1723/9103/products/Screen_Shot_2018-04-09_at_9.39.34_PM_1024x1024.png?v=1523328013";
        const {isAuthenticated, user} = this.props.auth;
        const authPage = (
            <div className="container center">
                <div class="row">
                    <div class="col s4">
                    <i class="large material-icons">forum</i>
                    <br></br>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <p className="center">Check the newest posts</p>
                    </div>
                    <div class="col s4">
                    <i class="large material-icons">forum</i>
                    <br></br>
                    <Link className="nav-link" to="/post_add">Add post</Link>
                    </div>
                    <div class="col s4">
                    
                    </div>
                </div>
            </div>
            
        )
      const guestPage = (
        <div className="container center">
                <img src={image} height="400"></img>
                <Link  to="/register">Register</Link> or <Link  to="/login">login as existing user</Link> to access the Fluffy Carnival page!
        </div>
      )

        return(
            <div>
                <div>
                    {isAuthenticated ? authPage : guestPage}
                </div>
            </div>
        )
    }
}
Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Home));