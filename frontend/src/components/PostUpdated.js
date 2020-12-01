import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class PostUpdated extends Component {
    render() {
        return (
            <div className="container">
                <div className="center text-center">
                    <h4>Post updated!</h4>
                    <button className="btn" onClick={() => this.props.history.goBack()}>Go to previous page</button>
                    <Link className="nav-link btn" to="/posts"><i className="material-icons left">keyboard_arrow_left</i>Back to all posts</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(PostUpdated)