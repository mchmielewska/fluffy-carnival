import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findPosts } from '../actions/postsActions';
import { findUsers } from '../actions/usersActions';

class SearchField extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = this.state.search;
    this.props.findPosts(query, this.props.history);
    this.props.findUsers(query, this.props.history);
  }

  render() {
    return (
      <li className="nav-item">
        <form onSubmit={this.handleSubmit} method="POST">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            onChange={this.handleInputChange}
            value={this.state.search}
          ></input>
          <button type="submit" className="btn">
            <i class="material-icons">search</i>
          </button>
        </form>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    findPosts: (query, history) => {
      dispatch(findPosts(query, history));
    },
    findUsers: (query, history) => {
      dispatch(findUsers(query, history));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchField));
