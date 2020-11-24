import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Axios from 'axios';

import CustomInput from './Customimput';

class ResetPassword extends Component {

    state = {
        email: ""
    }

    onSubmit = () => {
        Axios
            .post('http://localhost:9090/user/reset', { email: this.state.email })
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleChange = (event, fillName) => {
        this.setState({ [fillName]: event.target.value });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row valign-wrapper">
                <div className="col m6">
                    <img className="main-img" src="https://i.imgur.com/xkOkstF.png" alt="reset password" width="100%"></img>
                </div>
        
                    <div className="col m6 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <p>Please enter your email</p>
                            <fieldset className="input-field">
                                <Field
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="E-mail"
                                    value={this.state.email}
                                    onChange={event => this.handleChange(event, "email")}
                                    component={CustomInput} />

                            </fieldset>
                            <br></br>
                            <button type='submit' className="btn btn-primary">
                                Send email! <i className="material-icons right">chevron_right</i>
                            </button>
                        </form>

                    </div>
            </div>
            
        )
    }

}

export default reduxForm({ form: 'resetpassword' })(ResetPassword)

