import Factory from 'components/Factory';
import Twitt from 'components/Twitt';
import { dbService } from 'firebase-config';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [twittList, setTwittList] = useState([]);

  useEffect(() => {
    dbService.collection('mentionList').onSnapshot((snapShot) => {
      const mentionList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwittList(mentionList);
    });
  }, []);

  return (
    <div className="container">
      <Factory userObj={userObj}></Factory>
      <div style={{ marginTop: 30 }}>
        {twittList.map((twitt) => (
          <Twitt
            key={twitt.id}
            twittObj={twitt}
            isOwner={twitt.createdUser === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
