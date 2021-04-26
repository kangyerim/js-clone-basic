import { authService, dbService } from 'firebase-config';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyTwitts = async () => {
    let nweets = await dbService
      .collection('mentionList')
      .where('createdUser', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTwitts();
    console.log('userobg ', userObj);
  }, []);
  return (
    <>
      <button onClick={onLogOut}>LogOut</button>
    </>
  );
};
export default Profile;
