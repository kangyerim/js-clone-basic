import { authService, dbService } from 'firebase-config';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOut = () => {
    authService.signOut();
    history.push('/');
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
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
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={newDisplayName}
          onChange={onChange}
          type="text"
          placeholder="Display Name"
        ></input>
        <input type="submit" value="updateProfile"></input>
      </form>
      <button onClick={onLogOut}>LogOut</button>
    </>
  );
};
export default Profile;
