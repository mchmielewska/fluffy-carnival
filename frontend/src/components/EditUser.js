import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUsers, patchUser } from '../actions/usersActions';

import * as M from 'materialize-css';

class EditUser extends Component {

    constructor() {
        super();
        this.state = {
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            gender: this.state.gender,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            birthDate: this.state.birthDate
        }
        this.props.patchUser(user);
    }

    componentDidMount() {
            function select() {
                var elems = document.querySelectorAll('select');
                var options = {}
                var instances = M.FormSelect.init(elems, options);
              }
            select();
    }

    render() {
        this.props.getUsers();
        const user = this.props.user;

        return (
            <div className="container">
            <div className="center" style={{ marginTop: '50px' }}>
            <h4 style={{marginBottom: '40px'}}>Edit profile</h4>
            <div className="row valign-wrapper">
            <div className="col m6">
                <img className="main-img" src="https://i.imgur.com/hvneBJX.png" alt="register" width="100%"></img>
            </div>
            <div className="edit-form col m6">
            <form onSubmit={ this.handleSubmit }>
                <div className="input-field">
                    <span className="left">E-mail</span>
                    <input
                    type="email"
                    name="email"
                    className="validate"
                    required
                    disabled
                    value={ user.email }
                    />
                </div>
                <div className="input-field">
                    <span className="left">Name</span>
                    <input
                    type="text"
                    name="name"
                    required
                    onChange={ this.handleInputChange }
                    defaultValue={ user.name }
                    />
                </div>
                <div className="input-field">
                    <span className="left">Surname</span>
                    <input
                    type="text"
                    name="surname"
                    required
                    onChange={ this.handleInputChange }
                    defaultValue={ user.surname }
                    />
                </div>
                <div className="input-field">
                    <span className="left">Birth date</span>
                    <input
                    type="date"
                    name="birthDate"
                    required
                    onChange={ this.handleInputChange }
                    defaultValue= { user.birthDate.substring(0,10) }
                    />
                </div>
                <div className="row">
                    <div className="input-field col m12">
                        <span className="left">Gender</span>
                        <select
                            onChange={ this.handleInputChange }
                            name="gender"
                            defaultValue ={ user.gender }>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                <option value="other">other</option>
                        </select>
                    </div>
                </div>
                <div className="input-field">
                    <span className="left">Country</span>
                    <input
                    type="text"
                    name="country"
                    required
                    onChange={ this.handleInputChange }
                    defaultValue={ user.country }
                    />
                </div>
                <div className="input-field">
                    <span className="left">City</span>
                    <input
                    type="text"
                    name="city"
                    required
                    onChange={ this.handleInputChange }
                    defaultValue={ user.city }
                    />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </form>

            </div>
            </div>
        </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.user_id;

    return {
        currentUser: state.auth.user,
        user: state.users.all.find(user => user._id === id),
    }
}

export default connect(mapStateToProps, { getUsers, patchUser } )(withRouter(EditUser));
