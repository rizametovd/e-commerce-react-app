import classes from './SidebarItem.module.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

interface ISideBarItem {
  isOpen: boolean;
  title: string;
  link: string;
  icon: JSX.Element;
}

const SideBarItem: React.FC<ISideBarItem> = ({ isOpen, title, icon, link }) => {
  return (
    <li>
      <NavLink to={link} className={({ isActive }) => (isActive ? `${classes.activeLink}` : `${classes.link}`)}>
        {icon}
        <span className={`${classes['link-text']} ${isOpen ? classes.open : classes.close}`}>{title}</span>
      </NavLink>
    </li>
  );
};

export default SideBarItem;
