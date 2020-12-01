import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';
import Sidebar from '../components/Sidebar'

class Users extends Component {

    render() {
        this.props.getUsers();
        const users = this.props.users;

        const userList = users ? (
            users.map(user => {
                const getAge = birthDate => Math.floor((new Date() - new Date(user.birthDate).getTime()) / 3.15576e+10)
                return (
                    <div className="col m3" key={user._id}>
                        <div className="card profile-card valign-wrapper">
                                <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                                <div className="user-details">
                                    <Link to={'/users/' + user._id}>
                                        <p className="bold">{ user.name } { user.surname }</p>
                                    </Link>
                                    <p>{getAge()}, { user.city }</p>
                                    <p><span className="bold">{ user.friends.length }</span>
                                    <br></br><span className="uppercase">friends</span></p>
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
    return { users: state.users.all }
}

const mapDispatchToProps = (dispatch) => {
        return {
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
