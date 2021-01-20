import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateBuilder, getAuthorForSinglePostPage } from '../utils/postUtils';
import CommentsActionPanel from './CommentsActionPanel';
class Comment extends Component {
  render() {
    const users = this.props.users;
    return (
      <div key={this.props.id} className="single-comment card horizontal">
        <div className="author">
          {getAuthorForSinglePostPage(users, this.props)}
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{this.props.comment}</p>
          </div>
          <div className="card-action row">
            <div className="col m9">
              <p className="post-date">{dateBuilder(this.props.publishDate)}</p>
            </div>
            <CommentsActionPanel {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.all,
  };
};

export default connect(mapStateToProps)(Comment);
