import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost } from '../actions/postsActions';
import * as M from 'materialize-css';
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
      tags: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFileUpload(e) {
    let files = e.target.files;
    this.setState({ postImage: files[0] }, () => {});
  }

  handleSubmit(e) {
    e.preventDefault();
    const date = new Date();
    const tags = this.state.tags;
    const tagsArray = tags.toLowerCase().split(', ');

    const newPost = {
      authorId: this.props.authorId,
      title: this.state.title,
      description: this.state.description,
      privacyLevel: this.state.privacyLevel,
      publishDate: date,
      state: 'published',
      tags: tagsArray,
      postImage: this.state.postImage,
    };

    let formData = new FormData();
    Object.keys(newPost).forEach(function (key) {
      formData.append(key, newPost[key]);
    });

    this.props.addPost(formData, this.props.history);
  }

  componentDidMount() {
    function select() {
      var elems = document.querySelectorAll('select');
      var options = {};
      var instances = M.FormSelect.init(elems, options);
    }
    select();
  }

  render() {
    return (
      <div className="container">
        <button
          className="nav-link btn btn-primary back-btn"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <i className="material-icons left">keyboard_arrow_left</i>
          Back
        </button>

        <div className="row">
          <h4
            style={{ marginBottom: '40px', marginLeft: '15px' }}
            className="page-header"
          >
            New post
          </h4>
          <form
            className="col s12"
            onSubmit={this.handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="input-field">
              <i className="material-icons prefix">mode_edit</i>
              <input
                type="text"
                placeholder="title"
                className="form-control form-control-lg "
                name="title"
                onChange={this.handleInputChange}
                value={this.state.title}
              />
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">short_text</i>
                <textarea
                  // type="text"
                  placeholder="description"
                  className="materialize-textarea"
                  name="description"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <select
                  onChange={this.handleInputChange}
                  name="privacyLevel"
                  defaultValue="public"
                >
                  <option value="public">public</option>
                  <option value="friendsOnly">friends only</option>
                  <option value="private">private</option>
                </select>
                <label>Privacy</label>
              </div>
            </div>

            <div className="input-field">
              <label>Separate tags with space and comma! (max 3 tags)</label>
              <input
                type="text"
                placeholder="tags"
                className="form-control form-control-lg"
                name="tags"
                onChange={this.handleInputChange}
                value={this.state.tags}
              />
            </div>
            <div className="input-field file-field">
              <div className="btn">
                <span>File</span>
                <input
                  type="file"
                  id="postImage"
                  name="postImage"
                  onChange={(e) => this.handleFileUpload(e)}
                  accept="image/jpeg"
                ></input>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text"></input>
              </div>
            </div>

            <div className="input-field">
              <button type="submit" className="btn btn-primary">
                Save!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = state.auth.user.id;
  return {
    ...ownProps,
    authorId: userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (formData, history) => {
      dispatch(addPost(formData, history));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPost)
);
