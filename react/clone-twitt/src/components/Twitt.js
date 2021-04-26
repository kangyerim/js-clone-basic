import { dbService, storageService } from 'firebase-config';
import React, { useState } from 'react';

const Twitt = ({ twittObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwitt, setNewTwitt] = useState(twittObj.text);
  const onDelete = async () => {
    const ok = window.confirm('해당 트윗을 삭제하시겠습니까?');
    if (ok) {
      await dbService.doc(`mentionList/${twittObj.id}`).delete();
      await storageService.refFromURL(twittObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((pre) => !pre);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwitt(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`mentionList/${twittObj.id}`).update({ text: newTwitt });
    setNewTwitt('');
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newTwitt} onChange={onChange} type="text" required />
            <input type="submit" value="트윗 수정" />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <>
          <h4>{twittObj.text}</h4>
          {twittObj.attachmentUrl && (
            <img src={twittObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDelete}>delete</button>
              <button onClick={toggleEditing}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Twitt;
