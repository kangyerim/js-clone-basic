import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import EditProfile from '../routes/EditProfile';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {loggedIn ? (
          <>
            <Route exact path="/">
              <Home></Home>
              <Profile></Profile>
              <EditProfile></EditProfile>
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
