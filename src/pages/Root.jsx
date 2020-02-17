import React from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from 'pages/home';
import NotFound from 'pages/statics/404';
// import AuthRoute, { userAuth } from 'elements/AuthRoute';

/**
 * All pages has diferrent layout: Header, Footer, SideBar, etc .. should place here
 */

export default function Root() {
  return (
    <div className="Root-App">
      <Switch>
        {/* <AuthRoute path="/user" component={UserPage} middlewares={[
          userAuth
        ]} /> */}
        <Route exact path={['/', '/home']} component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
