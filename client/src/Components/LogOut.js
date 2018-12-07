import React from 'react';
import axios from 'axios';

import {logOut} from '.././Actions'

const LogOut = (props) => {

  let request = axios.get('/api/users/logout')
      .then(request => {
        props.dispatch(logOut());
        setTimeout(() => {
          //todo.. uncomment // props.history.push('/')
          // props.history.push('/')
        }, 2000)
      });

  return (
      <div className="logout_container">
        <h1>
          You Are Logged Out . . .
        </h1>
      </div>
  );
};

export default LogOut;


