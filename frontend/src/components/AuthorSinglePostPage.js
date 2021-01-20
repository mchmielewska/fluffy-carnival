import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const AuthorSinglePostPage = (props) => {
  const author = (users, post) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === post.authorId || users[i]._id === post.author) {
        const imageProps = {
          user: users[i],
          class: 'responsive-img single-post',
        };
        const authorDiv = (
          <div>
            <Link to={'/users/' + users[i]._id}>
              <ProfileImage {...imageProps} />
              <p className="bold">
                {users[i].name} {users[i].surname}
              </p>
            </Link>
          </div>
        );

        return authorDiv;
      }
    }
  };

  return <div className="author">{author(props.users, props.post)}</div>;
};

export default AuthorSinglePostPage;
