import React from 'react';
import { Link } from 'react-router-dom';

const CurrentUserProfileImage = (props) => {
  const history = props.history;
  const id = props.id;
  const user = props.user;

  const image = (user) => {
    if (user.profileImagePath === undefined) {
      return (
        <Link
          to={{
            pathname: `/users/${id}`,
            state: { from: history },
          }}
        >
          <img
            className="responsive-img"
            src="https://i.imgur.com/IJMRjcI.png"
            alt="profile"
          ></img>
        </Link>
      );
    } else {
      return (
        <Link
          to={{
            pathname: `/users/${id}`,
            state: { from: history },
          }}
        >
          <img
            className="responsive-img"
            src={user.profileImagePath}
            alt="profile"
          ></img>
        </Link>
      );
    }
  };
  return image(user);
};

export default CurrentUserProfileImage;
