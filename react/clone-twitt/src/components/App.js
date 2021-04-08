import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebase-config';

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouter loggedIn={loggedIn} /> : 'initializing...'}</>;
}

export default App;
