import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';

import Home from './Components/Home';
import Layout from './HOC/Layout';
import BookView from './Components/BookView';
import LoginCon from './Containers/LoginCon';
import Authentication from './HOC/Authentication';
import User from './Components/User';
import AddBook from './Containers/AddBook';
import EditBook from './Containers/EditBook';
import Register from './Containers/RegisterCon';
import UserPosts from './Components/UserPosts';
import LogOut from './Components/LogOut';

const Routes = () => {
  return (
      <Layout>
        <Switch >
          <Route path="/" exact component={Home} />
          <Route path="/user/register" exact component={ Register }/>
          <Route path="/login" exact component={Authentication(LoginCon)}/>
          <Route path="/user/logout" exact component={Authentication(LogOut)}/>
          <Route path="/user" exact component={Authentication(User)}/>
          <Route path="/user/add" exact component={Authentication(AddBook)}/>
          <Route path="/user/user-posts" exact component={Authentication(UserPosts)}/>
          <Route path="/user/edit-post/:id" exact component={Authentication(EditBook)}/>
          <Route path="/books/:id" exact component={Authentication(BookView)}/>
        </Switch>
      </Layout>
  );
};

export default Routes;