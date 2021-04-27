import React, { useState } from 'react';
import { dbService, storageService } from 'firebase-config';
import { v4 as uuidv4 } from 'uuid';

const Factory = ({ userObj }) => {
  const [mention, setMention] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment) {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweet = {
      text: mention,
      createdAt: Date.now(),
      createdUser: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('mentionList').add(nweet);
    setMention('');
    setAttachment('');
    setAttachment(null);
    document.getElementById('fileInput').value = '';
  };
  const onMention = (e) => {
    const {
      target: { value },
    } = e;
    setMention(value);
  };
  const onFileChange = (event) => {
    event.preventDefault();
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (theFile) reader.readAsDataURL(theFile);
  };
  const onClearFile = () => {
    setAttachment('');
    document.getElementById('fileInput').value = '';
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onMention}
        value={mention}
        type="text"
        placeholder="mention"
        maxLength={120}
      />
      <input
        onChange={onFileChange}
        type="file"
        accept="image/*"
        id="fileInput"
      />
      <input type="submit" value="twit" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="preview" />
          <button onClick={onClearFile}>clear img</button>
        </div>
      )}
    </form>
  );
};

export default Factory;
