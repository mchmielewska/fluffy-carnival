import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { patchPassword } from '../../actions/usersActions';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const errorMessage = document.getElementById('error');
    errorMessage.innerText = '';
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password !== this.state.validatepassword) {
      const errorMessage = document.getElementById('error');
      errorMessage.innerText = 'Passwords are different!';
      return;
    }

    const user = {
      password: this.state.password,
      validatepassword: this.state.validatepassword,
    };

    this.props.patchPassword(user, this.props.history);
  }

  render() {
    return (
      <div>
        <div className="center text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <span className="left">New password</span>
              <input
                type="password"
                name="password"
                className="validate"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <span className="left">Retype new password</span>
              <input
                type="password"
                name="validatepassword"
                required
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-field">
              <p id="error" className="red-text"></p>
              <button type="submit" className="nav-link btn btn-primary">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.user,
  };
};

export default withRouter(
  connect(mapStateToProps, { patchPassword })(ChangePassword)
);
