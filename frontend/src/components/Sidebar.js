import React from 'react';
import CurrentUser from './CurrentUser';
import SidebarLinks from './SidebarLinks';

export default function Sidebar(props) {
  return (
    <div className="sidebar col s2">
      <CurrentUser {...props} />
      <SidebarLinks {...props} />
    </div>
  );
}
