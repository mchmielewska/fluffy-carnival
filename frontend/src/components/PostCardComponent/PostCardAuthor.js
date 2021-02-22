import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';

class PostCardAuthor extends Component {
  render() {
    let users = this.props.users ? this.props.users : [];
    const post = this.props.post;

    const postAuthor = (users, post, size = 'm2 s2') => {
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === post.authorId || users[i]._id === post.author) {
          const className = `col ${size} post-header`;
          const imageProps = {
            user: users[i],
            class: 'responsive-img post-header',
          };
          const author = (
            <div className="row">
              <div className={className}>
                <ProfileImage {...imageProps} />
              </div>
              <div className="col m10 s10">
                <Link to={'/users/' + users[i]._id}>
                  <p className="bold">
                    {users[i].name} {users[i].surname}
                  </p>
                </Link>
                <p>{users[i].city}</p>
              </div>
            </div>
          );

          return author;
        }
      }
    };

    return (
      <div className="post-header left-align col m9 s9">
        {postAuthor(users, post)}
      </div>
    );
  }
}

export default PostCardAuthor;
