import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Nav from './Nav';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

library.add(faBars);


class Header extends Component {
  constructor(props) {
    super(props);
    this.onHideNav = this.onHideNav.bind(this);
    this.state = {
      showNav: false
    }
  }

  onHideNav() {
    this.setState(() => {
      return {
        showNav: false
      }
    })
  }

  render() {
    return (
        <header>
          <div className="open_nav">
            <FontAwesomeIcon
                className="icon_bars"
                icon="bars"
                onClick={() => this.setState(() => {
                  return {showNav: true}
                })}
                style={{
                  color: "#fffff1",
                  padding: "12px",
                  cursor: "pointer"
                }}
            />
          </div>

          <Nav
              showNav={this.state.showNav}
              onHideNav={() => this.onHideNav()}
          />

          <Link to="/" className="logo">Library</Link>

        </header>
    );
  }
}


export default Header;
