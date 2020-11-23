import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost } from '../actions/postsActions';

class AddPost extends Component {
    
    constructor() {
        super();
        this.state = {
            authorId: '',
            title: '',
            description: '',
            privacyLevel: 'public',
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
        const date = new Date();
        const tags = this.state.tags
        const tagsArray = (tags.toLowerCase()).split(', ');
        

        const newPost = {
            authorId: this.state.userId,
            title: this.state.title,
            description: this.state.description,
            privacyLevel: this.state.privacyLevel,
            publishDate: date,
            state: this.state.state,
            tags: tagsArray
        }
        console.log(newPost);
        this.props.addPost(newPost, this.props.history);
    }

    render() {
        
        return (
            <div className="row center">
            <h4 style={{marginBottom: '40px'}} className="page-header">New post</h4>
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
                        <select
                            onChange={ this.handleInputChange }
                            name="privacyLevel"
                            defaultValue='public'>
                                <option value="public">public</option>
                                <option value="friendsOnly">friends only</option>
                                <option value="private">private</option>
                        </select>
                        <label>Privacy</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <select
                            onChange={ this.handleInputChange }
                            defaultValue='draft'
                            name="state">
                                <option value="draft">draft</option>
                                <option value="published">published</option>
                        </select>
                        <label>State</label>
                    </div>
                </div>

                <div className="input-field">
                    <label>Separate tags with commas!</label>
                    <input
                    type="text"
                    placeholder="tags"
                    className='form-control form-control-lg'
                    name="tags"
                    onChange={ this.handleInputChange }
                    value={ this.state.tags }
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

const mapStateToProps = (state, ownProps) => {
    const userId = state.auth.user.id;
    return {
        ...ownProps,
        authorId: userId
    }
}

export default connect(mapStateToProps, { addPost })(withRouter(AddPost));
