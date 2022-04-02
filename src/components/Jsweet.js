import React, { useState } from "react";
import { dbService, storageService } from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Jsweet = ({ jsweetObj, isOwner }) => {
  console.log(jsweetObj);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you really Delte?");

    // refFromURL : jsweets컬렉션의 attachmentUrl로부터 받을 수 있다.
    if (ok) {
      // delete
      await dbService.doc(`jsweets/${jsweetObj.id}`).delete();
      if (jsweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(jsweetObj.attachmentUrl).delete();
      }
    } else {
      // no delete
    }
  };

  const [editing, setEditing] = useState(false);
  const [newJsweet, setNewJsweet] = useState(jsweetObj.text);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    editweet();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`jsweets/${jsweetObj.id}`).update({
      text: newJsweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewJsweet(value);
    editweet();
  };

  const editweet = () => {
    if (!editing) {
      setNewJsweet(jsweetObj.text);
    }
  };

  return (
    // weet 편집화면일 때
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your Jsweet"
                  value={newJsweet}
                  required
                  onChange={onChange}
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="Updata Jsweet" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        // weet 편집 화면이 아닐 때
        <>
          <h2>익명</h2>
          <hr />
          <h4>내용 : {jsweetObj.text}</h4>
          {jsweetObj.attachmentUrl && <img src={jsweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
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

export default Jsweet;
