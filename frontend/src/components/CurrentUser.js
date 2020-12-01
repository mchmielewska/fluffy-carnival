import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, getUsers } from '../actions/usersActions';
import { getFriendsList } from '../actions/friendsActions';

class CurrentUser extends Component {

    render() {
        this.props.getCurrentUser();
        this.props.getFriendsList();
        this.props.getUsers();

        const currentUser = this.props.user;
        const friends = this.props.friends;
        const id = this.props.id;
        const profileData = currentUser ? (
            <div>
                <div className="center-align row">
                    {/* <h5 className="spaced">Hello { currentUser.user.name }!</h5> */}
                    <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                    <div className="user-details">
                        <p>{ currentUser.user.name } { currentUser.user.surname }</p>
                        <p>{ currentUser.user.city }</p>
                        <div className="row center-align">
                            <div className="col m6">
                                <p><span className="bold">{ currentUser.posts.length }</span>
                                <br></br><span className="uppercase">posts</span></p>
                            </div>
                            <div className="col m6">
                                <p><span className="bold">{ friends.length }</span>
                                <br></br><span className="uppercase">friends</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-links row">
                    <Link 
                        className="valign-wrapper" to={ {
                            pathname: `/users/${id}`
                        }}>
                    <i className="material-icons">person</i>Profile</Link>
                </div>

            </div>

                
            ) : (
            <div className="center-align">
                User not found
            </div>
        )

        return ( 
            profileData
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.user.id,
        user: state.users.currentUser,
        users: state.users.all,
        friends: state.friends.friendsList
    }
}

const mapDispatchToProps = (dispatch) => {
return {
    getCurrentUser: () => {
        dispatch(getCurrentUser())
    },
    getFriendsList: () => {
        dispatch(getFriendsList())
    },
    getUsers: () => {
        dispatch(getUsers())
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)
