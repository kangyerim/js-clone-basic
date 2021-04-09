import { authService } from 'firebase-config';
import React from 'react';
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={onLogOut}>LogOut</button>
    </>
  );
};
export default Profile;
