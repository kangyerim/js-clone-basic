import Twitt from 'components/Twitt';
import { dbService } from 'firebase-config';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [mention, setMention] = useState('');
  const [twittList, setTwittList] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('mentionList').add({
      text: mention,
      createdAt: Date.now(),
      createdUser: userObj.uid,
    });
    setMention('');
  };
  const onMention = (e) => {
    const {
      target: { value },
    } = e;
    setMention(value);
  };
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onMention}
          value={mention}
          type="text"
          placeholder="mention"
          maxLength={120}
        />
        <input type="submit" value="twit" />
      </form>
      <div>
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
