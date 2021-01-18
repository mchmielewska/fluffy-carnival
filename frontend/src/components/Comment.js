import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateBuilder, getAuthor } from '../utils/postUtils';
class Comment extends Component {
  render() {
    console.log(this.props);
    const users = this.props.users;
    return (
      <div key={this.props.id} className="single-comment">
        <div>{getAuthor(users, this.props)}</div>
        <h6>{this.props.title}</h6>
        <p>{this.props.comment}</p>
        <p>{dateBuilder(this.props.publishDate)}</p>
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
