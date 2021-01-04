import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class PostAdded extends Component {
  render() {
    return (
      <div className="container">
        <div className="center text-center">
          <h4>Post created!</h4>
          <Link className="link" to="/posts">
            Go back to Dashboard page
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(PostAdded);
