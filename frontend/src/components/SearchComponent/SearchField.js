import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findPosts } from '../../actions/postsActions';
import { findUsers } from '../../actions/usersActions';

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
    this.setState({ search: '' });
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
            pattern=".{3,}"
            required
            title="3 characters minimum"
          ></input>
          <button type="submit" className="btn search">
            <i className="material-icons">search</i>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchField)
);
