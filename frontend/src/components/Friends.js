import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { acceptInvite, declineInvite, removeFriend } from '../actions/friendsActions';
import Sidebar from '../components/Sidebar'

class Friends extends Component {

    render() {
        const users = this.props.users
        const currentUser = this.props.currentUser;
        const friends = this.props.friends;
        const pendingInvites = this.props.pendingInvites

        const handleClick = (token, action) => {
            if (action === 'accept') {
                this.props.acceptInvite(token);
            } else if (action === 'decline') {
                this.props.declineInvite(token);
            }
        }

        const handleRemove = (id) => {
            this.props.removeFriend(id);
        }
    

        function checkFriendship(friendship, currentUser) {
            if (friendship.requestor === currentUser) {
                return {
                    id: friendship.requested,
                    actionsAvailable: false
                    };
            } else if (friendship.requested === currentUser) {
                return  {
                    id: friendship.requestor,
                    actionsAvailable: true
                    }
            }
        }

        function actionIcons(invite, actions, accept) {
            if (actions) {
                const token = invite.inviteToken;

                return (
                    <div>
                       <button className="material-icons action-button" onClick={ (e) => handleClick(token, 'accept') }>check</button>
                       <button className="material-icons action-button" onClick={ (e) => handleClick(token, 'decline') }>clear</button> 
                    </div>
                )
            } else {
                return (
                    <div>
                        invitation sent
                    </div>
                )
            }
        }

        function getUserData(userId) {
            const user = users.find(user => user._id === userId) 
            return (
                    <div>
                                <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                                <div className="user-details">
                                    <Link to={'/users/' + user._id}>
                                        <p className="bold">{ user.name } { user.surname }</p>
                                    </Link>
                                    <p>{ user.city }</p>

                                    <button className="material-icons action-button" onClick={ (e) => handleRemove(user._id) }>remove_circle_outline</button>
                                </div>
                                
                    </div>
                )
        }

        const pendingInvitesList = pendingInvites.length ? (
            pendingInvites.map(invite => {
                const userId = checkFriendship(invite, currentUser).id
                const actions = checkFriendship(invite, currentUser).actionsAvailable

                return (
                    <div className="col m3" key={invite.id}>
                        <div className="card profile-card valign-wrapper">
                        { getUserData(userId) }
                        
                        </div>
                        { actionIcons(invite, actions) }
                    </div>
                )
            })
        ) : (
            <div className="center">
                No pending invites
            </div>
        )

        function profileImage (user) {
            if (user.profileImagePath === undefined) {
                return (
                <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                )} else {
                return (<img className="responsive-img" src={user.profileImagePath} alt="profile"></img>)
                }
        }

        const friendsList = friends.length ? (
            friends.map(friend => {
                const getAge = birthDate => Math.floor((new Date() - new Date(friend.birthDate).getTime()) / 3.15576e+10)
                return (
                    <div className="col m3" key={friend._id}>
                        <div className="card profile-card valign-wrapper">
                                { profileImage(friend)}
                                <div className="user-details">
                                    <Link to={'/users/' + friend._id}>
                                        { friend.id }
                                        <p className="bold username">{ friend.name } { friend.surname }</p>
                                    </Link>
                                    <p>{getAge()}, { friend.city }</p>
                                </div>
                                <div className="action">
                                    <button className="action-button" onClick={ (e) => handleRemove(friend._id) }>
                                        <i className="material-icons tiny">remove_circle_outline</i>Remove from friends
                                    </button>
                                </div>
                        </div>
                        
                    </div>
                )
            })
        ) : (
            <div className="center">
                No friends found
            </div>
        )

        return ( 
            <div className="row">
                    <Sidebar />
                    <div className="col s10">
                        <div className="row center">
                            <h5 className="left-align">Pending invites:</h5>
                            { pendingInvitesList }
                        </div>
                        <div className="row center">
                            <h5 className="left-align">Friends:</h5>
                            { friendsList }
                        </div>
                    </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
        currentUser: state.auth.user.id,
        users: state.users.all,
        friends: state.friends.friendsList,
        pendingInvites: state.friends.pending }
}

const mapDispatchToProps = (dispatch) => {
        return {
            acceptInvite: (token) => {
                dispatch(acceptInvite(token))
            },
            declineInvite: (token) => {
                dispatch(declineInvite(token))
            },
            removeFriend: (id) => {
                dispatch(removeFriend(id))
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
