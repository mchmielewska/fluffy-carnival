import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers, patchUser, patchProfileImage } from '../actions/usersActions';
import ChangePassword from './ChangePassword';
import * as FilePond from 'filepond';
import * as M from 'materialize-css';
import FormData from 'form-data'
class EditUser extends Component {

    constructor() {
        super();
        this.state = {
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
    }

    handleInputChange(e) {
        console.log("hello");
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
        this.props.patchUser(user, this.props.history);
    }

    handleImageSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        console.log(this.state.profileImage)

        let formData = new FormData();

        const profileImage = this.state.profileImage
        console.log(profileImage)

        formData.append("profileImage", profileImage);
        formData.append('_method', 'PATCH');
        console.log("formData local", formData);

        this.props.patchProfileImage(formData, this.props.history)
    }

    handleFileUpload(e) {
        let files = e.target.files;
        this.setState({ profileImage: files[0] }, () => { console.log(this.state.profileImage) });
    }

    componentDidMount() {
            function select() {
                var elems = document.querySelectorAll('select');
                var options = {}
                var instances = M.FormSelect.init(elems, options);
              }
            select();

              
            FilePond.setOptions({
                stylePanelAspectRatio: 100 / 100,
                imageResizeTargetWidth: 150,
                imageResizeTargetHeight: 150,
                server: {
                    process: {
                      url: "http://localhost:9090/users/profileimage",
                      headers: { "token": localStorage.getItem('jwtToken') }
                    }
                  }
              })

            FilePond.parse(document.body);
              
    }

    render() {

        

        this.props.getUsers();
        const user = this.props.user;

        function handleClick(e) {
            e.preventDefault();
            const div = document.getElementById('change-password');
            const button = document.getElementById('change-password-button');
            div.classList.remove('hidden');
            button.classList.add('hidden')

        }
        
        return (
            <div className="container">
            <div className="center" style={{ marginTop: '50px' }}>
            <h4 style={{marginBottom: '40px'}}>Edit profile</h4>
            <div className="row form-wrapper">
                <div className="col m6">
                    <div>
                        {/* <img className="main-img" src="https://i.imgur.com/hvneBJX.png" alt="register" width="100%"></img> */}
                        <form onSubmit={ this.handleImageSubmit } method="POST" encType="multipart/form-data">
                        <input type="file"
       id="profileImage" name="profileImage" onChange={e => this.handleFileUpload(e)}
       accept="image/png, image/jpeg">

       </input>
                        <div className="input-field">
                            <label>Profile picture</label>
                            <input type="file" name="profileImage" className="filepond" onChange={ e => this.handleFileUpload(e) }></input>
                        </div>
                        <div className="input-field">
                            <button type="submit" className="nav-link btn btn-primary">
                                Save Image
                            </button>
                        </div>
                        </form>
                </div>

            <button className="nav-link btn btn-primary" onClick={() => { this.props.history.goBack()}}><i className="material-icons left">keyboard_arrow_left</i>Back</button>   
                
                
            </div>
            <div className="edit-form col m6">
                <button id="change-password-button" className="btn" onClick={ (e) => handleClick(e) }>Change password</button>
                <div id="change-password" className="hidden">
                    <ChangePassword />
                </div>
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
                    <button type="submit" className="nav-link btn btn-primary">
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
    console.log("stan",state)

    return {
        currentUser: state.auth.user,
        user: state.users.all.find(user => user._id === id),
    }
}

export default connect(mapStateToProps, { getUsers, patchUser, patchProfileImage } )(withRouter(EditUser));