import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/usersActions';
import Sidebar from '../components/Sidebar';
import UserCard from './UserCard';
class Users extends Component {
  componentDidMount() {
    // const previousPathObject = this.props.location;
    // const previousPath = previousPathObject.state.from;
    this.props.getUsers();
  }
  render() {
    const users = this.props.users;

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

    return (
      <div className="row">
        <Sidebar {...this.props} />
        <div className="col s10">
          <div className="row center">{userList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
