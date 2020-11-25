import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'
import { getUsers } from '../actions/usersActions'

class UserProfile extends Component {
    
    render() {
        this.props.getUsers();

        const getAge = birthDate => Math.floor((new Date() - new Date(this.props.user.birthDate).getTime()) / 3.15576e+10)
        const user = this.props.user ? ( 
                        <div className="valign-wrapper">
                                <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                                <div className="">
                                    <p className="bold">{ this.props.user.name } { this.props.user.surname }</p>
                                    <p>{getAge()}, { this.props.user.city }</p>
                                    <p><span className="bold">{ this.props.user.friends.length }</span>
                                    <br></br><span className="uppercase">friends</span></p>
                                </div>
                        </div>
        ) : (
            <div className="center">
                Loading user data...
            </div>
        )
    
        return (
            <div className="row">
                <div className="col s10">
                    <div className="row">
                            <div className="col m2">
                                <Link className="nav-link btn" to="/people"><i className="material-icons left">keyboard_arrow_left</i>Back</Link>
                            </div>
                            <div className="col m4 center">
                                {user}
                            </div>
                            <div className="col m6">

                            </div>
                    </div>
                    </div>
                <Sidebar />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.user_id;
    return {
        user: state.users.all.find(user => user._id === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    getUsers: () => {
        dispatch(getUsers())
    }
}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)