import Factory from 'components/Factory';
import Twitt from 'components/Twitt';
import { dbService } from 'firebase-config';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [twittList, setTwittList] = useState([]);

  // const getTwittList = async () => {
  //   const storedMentionList = await dbService.collection('mentionList').get();
  //   storedMentionList.docs.forEach((doc) => {
  //     const twittObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTwittList((pre) => [twittObj, ...pre]);
  //   });
  // };
  useEffect(() => {
    // getTwittList();
    dbService.collection('mentionList').onSnapshot((snapShot) => {
      const mentionList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwittList(mentionList);
    });
  }, []);

  return (
    <div>
      <Factory userObj={userObj}></Factory>
      {twittList.map((twitt) => (
        <Twitt
          key={twitt.id}
          twittObj={twitt}
          isOwner={twitt.createdUser === userObj.uid}
        />
      ))}
    </div>
  );
};
export default Home;
