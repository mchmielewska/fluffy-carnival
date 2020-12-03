import React from 'react';
import CurrentUser from './CurrentUser';
import SidebarLinks from './SidebarLinks'

export default function Sidebar () {
        return (
            <div className="sidebar col s2">
                <CurrentUser />
                <SidebarLinks />
            </div>
        )
    }
