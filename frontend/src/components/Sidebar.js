import React from 'react';
import CurrentUser from './CurrentUser';
import SidebarLinks from './SidebarLinks';

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      {/* <CurrentUser {...props} /> */}
      <SidebarLinks {...props} />
    </div>
  );
}
