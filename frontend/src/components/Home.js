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
        const image = "https://i.imgur.com/HO6Cme5.jpg";
        const {isAuthenticated, user} = this.props.auth;
        const authPage = (
            <div className="container center">
                    <div className="row">
                        <div className="col s4">
                            <i className="home large material-icons">whatshot</i>
                            <br></br>
                            <Link className="nav-link btn" to="/dashboard">Dashboard</Link>
                            <p className="">Check the newest posts</p>
                        </div>
                        <div className="col s4">
                            <i className="home large material-icons">mode_edit</i>
                            <br></br>
                            <Link className="nav-link btn" to="/post_add">Add post</Link>
                        </div>
                        <div className="col s4">
                            <i className="home large material-icons">mode_edit</i>
                            <br></br>
                            <Link className="nav-link btn" to="/post_add">Add post</Link>
                        </div>
                    </div>
                </div>
        )
      const guestPage = (
        <div className="container center">
                <img className="main-img" src={image} alt="social media"></img>
                <br></br>
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