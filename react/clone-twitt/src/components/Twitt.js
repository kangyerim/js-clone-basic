import { dbService, storageService } from 'firebase-config';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={newTwitt}
              onChange={onChange}
              type="text"
              className="formInput"
              required
              autoFocus
            />
            <input type="submit" value="트윗 수정" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{twittObj.text}</h4>
          {twittObj.attachmentUrl && (
            <img
              src={twittObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="첨부된 사진"
            />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Twitt;
