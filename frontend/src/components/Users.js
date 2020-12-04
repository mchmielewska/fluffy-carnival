import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';
import Sidebar from '../components/Sidebar'
import { inviteFriend } from '../actions/friendsActions';

class Users extends Component {

    render() {
        this.props.getUsers();
        const currentUser = this.props.currentUser;
        const friendsList = this.props.friendsList;
        const friendsIds = friendsList.map(el => el._id);
        
        const handleInvite = (id) => {
            this.props.inviteFriend(id);
        }

        function sendInvitation (user) {
            if (user._id === currentUser || friendsIds.includes(user._id)) return;

            return (
                <button className="action-button" onClick={ (e) => handleInvite(user._id) }><i className="material-icons tiny">add_circle_outline</i> Add to friends</button>
            )
        }

        
        function profileImage (user) {
            if (user.profileImagePath === undefined) {
                return (
                <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                )} else {
                return (<img className="responsive-img" src={user.profileImagePath} alt="profile"></img>)
                }
        }

        const users = this.props.users;

        const userList = users ? (
            users.map(user => {
                const getAge = birthDate => Math.floor((new Date() - new Date(user.birthDate).getTime()) / 3.15576e+10)
                return (
                    <div className="col m3" key={user._id}>
                        <div className="card profile-card valign-wrapper">
                                { profileImage (user)}
                                <div className="user-details">
                                    <Link to={'/users/' + user._id}>
                                        <p className="bold username">{ user.name } { user.surname }</p>
                                    </Link>
                                    <p className="small-text">{getAge()}, { user.city }</p>
                                    <div className="friends-counter">
                                        <span className="bold">{ user.friends.length }</span>
                                        <br></br>
                                        <span className="uppercase">friends</span>
                                    </div>
                                    <div className="action">{ sendInvitation(user) }</div>
                                </div>

                        </div>
                    </div>
                )
            })
        ) : (
            <div className="center">
                No users found
            </div>
        )

        return ( 
            <div className="row">
                    <Sidebar />
                    <div className="col s10">
                        <div className="row center">
                            { userList }
                        </div>
                    </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        friendsList: state.friends.friendsList,
        currentUser: state.auth.user.id,
        users: state.users.all 
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
        getUsers: () => {
            dispatch(getUsers())
        },
        inviteFriend: (id) => {
            dispatch(inviteFriend(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
