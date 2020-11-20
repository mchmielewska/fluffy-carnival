import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addPost } from '../actions/postsActions'
// import posts from '../../../backend/models/posts';

class AddPost extends Component {
    
    constructor() {
        super();
        this.state = {
            authorId: '',
            title: '',
            description: '',
            privacyLevel: '',
            publishDate: '',
            state: '',
            tags: ''
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
        const newPost = {
            authorId: this.state.userId,
            title: '',
            description: '',
            privacyLevel: '',
            publishDate: '',
            state: '',
            tags: ''
        }
        console.log(newPost)
        // this.props.registerUser(newPost, this.props.history);
    }

    render() {
        const loggedUser = ''
        return (
            <div className="row center">
            <h4 style={{marginBottom: '40px'}}>New post</h4>
            <form className="col s12" onSubmit={ this.handleSubmit }>
                <div className="input-field">
                <i className="material-icons prefix">mode_edit</i>
                    <input
                    type="text"
                    placeholder="title"
                    className="form-control form-control-lg "
                    name="title"
                    onChange={ this.handleInputChange }
                    value={ this.state.title }
                    />
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">short_text</i>
                        <textarea
                        // type="text"
                        placeholder="description"
                        className='materialize-textarea'
                        name="description"
                        onChange={ this.handleInputChange }
                        value={ this.state.description }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select>
                                <option value="public" selected>public</option>
                                <option value="friendsOnly">friends only</option>
                                <option value="private">private</option>
                        </select>
                        <label>Privacy</label>
                    </div>
                </div>

                <div className="input-field">
                    <input
                    type="text"
                    placeholder="Country"
                    className='form-control form-control-lg'
                    name="country"
                    onChange={ this.handleInputChange }
                    value={ this.state.country }
                    />
                </div>
                <div className="input-field">
                    <input
                    type="text"
                    placeholder="City"
                    className='form-control form-control-lg'
                    name="city"
                    onChange={ this.handleInputChange }
                    value={ this.state.city }
                    />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn btn-primary">
                        Save!
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

// Register.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };


const mapStateToProps = (state, ownProps) => {
    const userId = state.auth.user.id;
    return {
        ...ownProps,
        authorId: userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => {
            dispatch(addPost(post))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPost));
