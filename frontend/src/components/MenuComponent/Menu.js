import React from 'react';
import MenuLinks from './MenuLinks';

export default function Menu(props) {
  return (
    <div className="sidebar">
      <MenuLinks {...props} />
    </div>
  );
}
