import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import EditProfile from 'routes/EditProfile';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ loggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {loggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {loggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: '100%',
              margin: '0 auto',
              marginTop: 80,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/editprofile">
              <EditProfile />
            </Route>
          </div>
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
