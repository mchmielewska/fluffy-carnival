import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPosts, patchPost } from '../actions/postsActions';
import * as M from 'materialize-css'
import { stopSubmit } from 'redux-form';


class EditPost extends Component {
    
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
        
        let tagsArray = undefined;

        if (this.state.tags) {
            const tags = this.state.tags
            tagsArray = (tags.toLowerCase()).split(', ');
        }
        
        const postId = this.props.post.id;

        const post = {
            title: this.state.title,
            description: this.state.description,
            privacyLevel: this.state.privacyLevel,
            publishDate: this.state.date,
            state: this.state.state,
            tags: tagsArray
        }
        
        this.props.patchPost(postId, post, this.props.history);
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
        this.props.getPosts();
        const post = this.props.post;
        console.log(this.props)

        return (
            <div className="container">
            <div className="row">
            <h4 style={{marginBottom: '40px'}} className="page-header">Edit post</h4>
            <form className="col s12" onSubmit={ this.handleSubmit }>
                <div className="input-field">
                <i className="material-icons prefix">mode_edit</i>
                    <input
                    type="text"
                    placeholder="title"
                    className="form-control form-control-lg "
                    name="title"
                    onChange={ this.handleInputChange }
                    defaultValue={ post.title }
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
                        defaultValue={ post.description }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select
                            onChange={ this.handleInputChange }
                            name="privacyLevel"
                            defaultValue={ post.privacyLevel }>
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
                            defaultValue={ post.state }
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
                    defaultValue={ post.tags }
                    />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn btn-primary">
                        Save!
                    </button>
                </div>
            </form>
            <button className="nav-link btn btn-primary" onClick={() => { this.props.history.goBack()}}><i className="material-icons left">keyboard_arrow_left</i>Back</button>

        </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("props:", ownProps);
    let id = ownProps.match.params.post_id;
    return {
        ...ownProps,
        post: state.posts.find(post => post.id === id),
    }
}


export default connect(mapStateToProps, { getPosts, patchPost } )(withRouter(EditPost));
