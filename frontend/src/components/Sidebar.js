import React from 'react';
import SidebarLinks from './SidebarLinks';

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <SidebarLinks {...props} />
    </div>
  );
}
