import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import EditProfile from 'routes/EditProfile';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ loggedIn }) => {
  return (
    <Router>
      {loggedIn && <Navigation />}
      <Switch>
        {loggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/myprofile">
              <Profile />
            </Route>
            <Route exact path="/editprofile">
              <EditProfile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
