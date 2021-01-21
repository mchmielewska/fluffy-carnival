import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import { cleanErrors } from '../actions/errorActions';
import * as M from 'materialize-css';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      gender: 'other',
      country: '',
      city: '',
      birthDate: '',
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
    const user = {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      gender: this.state.gender,
      password: this.state.password,
      country: this.state.country,
      city: this.state.city,
      birthDate: this.state.birthDate,
    };
    this.props.registerUser(user, this.props.history);
    this.props.cleanErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.props.cleanErrors();

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    function select() {
      var elems = document.querySelectorAll('select');
      var options = {};
      var instances = M.FormSelect.init(elems, options);
    }
    select();
  }

  render() {
    const error = this.props.errors;
    const showError = error ? (
      <div className="error">{error.message}</div>
    ) : null;

    return (
      <div className="container">
        <div className="center" style={{ marginTop: '50px' }}>
          <h4 style={{ marginBottom: '40px' }}>Registration</h4>
          <div className="row valign-wrapper">
            <div className="col m6">
              <img
                className="main-img"
                src="https://i.imgur.com/hvneBJX.png"
                alt="register"
                width="100%"
              ></img>
            </div>
            <div className="col m6">
              <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    className="validate"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                  <span
                    className="helper-text"
                    data-error="incorrect e-mail"
                  ></span>
                </div>
                <div className="input-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.name}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Surname *</label>
                  <input
                    type="text"
                    name="surname"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.surname}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="birthDate">Birth date *</label>
                  <input
                    type="date"
                    placeholder="DD-MM-YYYY"
                    name="birthDate"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.birthDate}
                  />
                </div>
                <div className="row">
                  <div className="input-field col m12">
                    <select
                      onChange={this.handleInputChange}
                      name="gender"
                      defaultValue="other"
                    >
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="other">other</option>
                    </select>
                    <label>Gender *</label>
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    name="country"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.country}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.city}
                  />
                </div>
                <div className="input-field">
                  <p className="register-info">* required fields</p>
                  <p className="register-info">
                    Password must contain at least: 8 characters and one:
                    uppercase letter, lowercase letter, number and special sign
                  </p>
                  {showError}
                  <button type="submit" className="btn btn-primary">
                    Register User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { registerUser, cleanErrors })(Register)
);
