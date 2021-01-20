import React from 'react';

const ProfileImage = (props) => {
  const user = props.user;
  const className = props.class;

  const image = (user) => {
    if (user.profileImagePath === undefined) {
      return (
        <img
          className={className}
          src="https://i.imgur.com/IJMRjcI.png"
          alt="profile"
        ></img>
      );
    } else {
      return (
        <img
          className={className}
          src={user.profileImagePath}
          alt="profile"
        ></img>
      );
    }
  };

  return <span>{image(user)}</span>;
};

export default ProfileImage;
