import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/usersActions';
import Sidebar from '../components/Sidebar';
import UserCard from './UserCard';
import Login from './Login';
class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const users = this.props.users;
    const { isAuthenticated } = this.props.auth;

    const userList = users ? (
      users.map((user) => {
        const userProps = {
          ...this.props,
          user: user,
        };
        return <UserCard {...userProps} key={user._id} />;
      })
    ) : (
      <div className="center">No users found</div>
    );

    const authPage = (
      <div className="row">
        <div className="col">
          <div className="row center">{userList}</div>
        </div>
      </div>
    );

    const location = this.props.history.location;
    const loginProps = {
      previousLocation: location,
    };

    return <div>{isAuthenticated ? authPage : <Login {...loginProps} />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user.id,
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
