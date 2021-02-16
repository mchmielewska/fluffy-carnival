import React from 'react';

const CurrentUserProfileImage = (props) => {
  const user = props.currentUser.user;

  const image = (user) => {
    if (user.profileImagePath === undefined) {
      return (
        <img
          className="responsive-img"
          src="https://i.imgur.com/IJMRjcI.png"
          alt="profile"
        ></img>
      );
    } else {
      return (
        <img
          className="responsive-img"
          src={user.profileImagePath}
          alt="profile"
        ></img>
      );
    }
  };
  return image(user);
};

export default CurrentUserProfileImage;
