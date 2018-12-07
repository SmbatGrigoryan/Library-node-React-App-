import React from 'react';
import {Link} from 'react-router-dom';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faFileAlt,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faBook,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faHome, faFileAlt, faSignInAlt, faSignOutAlt, faUser, faBook, faUserPlus);


const NavItems = (props) => {
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/'
    },
    {
      type: 'navItem',
      icon: 'sign-in-alt',
      text: 'Login',
      link: '/login'
    },
    {
      type: 'navItem',
      icon: 'user-plus',
      text: 'Add User (Signing up)',
      link: '/user/register'
    },
    {
      type: 'navItem',
      icon: 'user',
      text: 'My Profile',
      link: '/user',
    },
    {
      type: 'navItem',
      icon: 'file-alt',
      text: 'My posts',
      link: '/user/user-posts'
    },
    {
      type: 'navItem',
      icon: 'book',
      text: 'Add Book',
      link: '/user/add'
    },
    {
      type: 'navItem',
      icon: 'sign-out-alt',
      text: 'Logout',
      link: '/user/logout'
    }
  ];

  const element = (item, i) => {
    return (
        <div className={item.type} key={i}>
          <Link to={item.link}>
            <FontAwesomeIcon icon={item.icon}/>
            <span>{item.text}</span>
          </Link>
        </div>
    )
  };

  const showItems = () => {
    return items.map((item, i) => {
      return element(item, i)
    })
  };

  return (
      <div>
        {showItems()}
      </div>
  );
};

export default NavItems;
