import React from 'react';
import ProfileImage from '../ProfileImage';
import UserProfileActionPanel from './UserProfileActionPanel';

const UserPanel = (props) => {
  const imageProps = {
    user: props.user,
    class: 'responsive-img',
  };
  return (
    <div className="row center">
      <div className="col s12">
        <ProfileImage {...imageProps} />
        <UserProfileActionPanel {...props} />
      </div>
      
    </div>
  );
};

export default UserPanel;
