import React from 'react';
import BackButton from './BackButton';
import SidebarLinks from './SidebarLinks';

const UserProfileSidebar = (props) => {
  return (
    <div className="col m2">
      <BackButton {...props} />
      <SidebarLinks {...props} />
    </div>
  );
};

export default UserProfileSidebar;
