import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class UserUpdated extends Component {
    render() {
        return (
            <div className="container">
                <div className="center text-center">
                    <h4>User updated!</h4>
                    <button className="btn" onClick={() => this.props.history.goBack()}>Go to previous page</button>
                </div>
            </div>
        )
    }
}

export default withRouter(UserUpdated)