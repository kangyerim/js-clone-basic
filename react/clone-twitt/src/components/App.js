import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebase-config';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter loggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'initializing...'
      )}
    </>
  );
}

export default App;
