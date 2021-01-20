import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const Author = (props) => {
  const author = (users, post, size = 'm2') => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === post.authorId || users[i]._id === post.author) {
        const className = `col ${size} post-header`;
        const imageProps = {
          user: users[i],
          class: 'responsive-img post-header',
        };
        const authorDiv = (
          <div className="row">
            <div className={className}>
              <ProfileImage {...imageProps} />
            </div>
            <div className="col m10">
              <Link to={'/users/' + users[i]._id}>
                <p className="bold">
                  {users[i].name} {users[i].surname}
                </p>
              </Link>
              <p>{users[i].city}</p>
            </div>
          </div>
        );

        return authorDiv;
      }
    }
  };

  return author(props.users, props.post, props.class);
};

export default Author;
