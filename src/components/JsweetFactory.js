import React, { useRef, useState } from "react";
import Jsweet from "./Jsweet";
import { dbService, storageService } from "../fBase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const JsweetFactory = ({ userObj }) => {
  // firebase에 jsweet로 저장
  const [jsweet, setJsweet] = useState("");

  // 파일 URL 저장
  const [attachment, setAttachment] = useState("");

  // 사진 clear 누른 후 file input에 남아있는 이미지 파일명을 지우기 위해 useRef 사용
  const fileInput = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (jsweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const jsweetObj = {
      text: jsweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("jsweets").add(jsweetObj);
    setJsweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setJsweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 사진 clear버튼 눌렀을 때
  const onClearAttachment = () => {
    fileInput.current.value = null;
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={jsweet}
          onChange={onChange}
          type="text"
          placeholder="Input Your Tweet"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{ backgroundImage: attachment }}
            ref={fileInput}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default JsweetFactory;
