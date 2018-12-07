import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItems from './NavItems';

const Nav = (props) => {
  return (
      <SideNav
          showNav={props.showNav}
          onHideNav={props.onHideNav}

          navStyle={{
            background: "#242420",
            maxWidth: "200px"
          }}
      >
        <NavItems/>
      </SideNav>
  );
};

export default Nav;
