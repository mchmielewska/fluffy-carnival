import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addComment } from '../actions/commentsActions';

class AddComment extends Component {
  constructor() {
    super();
    this.state = {
      authorId: '',
      comment: '',
      publishDate: '',
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
    const date = new Date();
    const id = this.props.post.id;
    const newComment = {
      author: this.props.author,
      comment: this.state.comment,
      publishDate: date,
    };
    this.props.addComment(id, newComment, this.props.history);
    this.setState({});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} method="POST">
            <div className="input-field">
              <i className="material-icons prefix">mode_edit</i>
              <input
                type="text"
                placeholder="comment"
                className="form-control form-control-lg "
                name="comment"
                onChange={this.handleInputChange}
                value={this.state.comment}
              />
            </div>

            <div className="input-field">
              <button type="submit" className="btn btn-primary">
                Add comment!
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
    author: userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment, history) => {
      dispatch(addComment(comment, history));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddComment)
);
