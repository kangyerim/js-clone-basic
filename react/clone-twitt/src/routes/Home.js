import { dbService } from 'firebase-config';
import React, { useState } from 'react';

const Home = () => {
  const [mention, setMention] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('mentionList').add({
      mention,
      createdAt: Date.now(),
    });
    setMention('');
  };
  const onMention = (e) => {
    const {
      target: { value },
    } = e;
    setMention(value);
  };
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
    </div>
  );
};
export default Home;
