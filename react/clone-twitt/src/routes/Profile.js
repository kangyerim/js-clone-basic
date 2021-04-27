import { authService, dbService } from 'firebase-config';
import React, { useState, useEffect } from 'react';
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
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            value={newDisplayName}
            onChange={onChange}
            type="text"
            placeholder="Display Name"
            autoFocus
            className="formInput"
          ></input>
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          ></input>
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOut}>
          Log Out
        </span>
      </div>
    </>
  );
};
export default Profile;
