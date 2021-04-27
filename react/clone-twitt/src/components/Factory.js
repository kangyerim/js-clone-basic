import React, { useState } from 'react';
import { dbService, storageService } from 'firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Factory = ({ userObj }) => {
  const [mention, setMention] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (mention === '') {
      return;
    }
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
    document.getElementById('attach-file').value = '';
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
    document.getElementById('attach-file').value = '';
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factory__container">
        <input
          onChange={onMention}
          value={mention}
          type="text"
          placeholder="mention"
          maxLength={120}
          className="factory__input"
        />
        <input type="submit" value="twit" className="factory__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
        type="file"
        accept="image/*"
        id="attach-file"
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="첨부된 이미지"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearFile}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default Factory;
