import React, { useEffect, useState } from "react";
import { autoService, dbService } from "../fBase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  var tmpName = null;
  var name = null;
  if (userObj.displayName == null) {
    tmpName = userObj.bc.email.split("@");
    name = tmpName[0];
  }

  const onLogOutClick = () => {
    autoService.signOut();

    // gh-pages용
    window.location.replace("/jswitter");
  };

  const getMyJsweets = async () => {
    const jsweets = await dbService
      .collection("jsweets")
      .where("creatorId", "==", `${userObj.uid}`)
      .orderBy("createAt")
      .get();
    console.log(jsweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyJsweets();
  }, []);

  // gmail 가입과 email 가입 구분
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName !== null ? userObj.displayName : name
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });

      window.alert("Profile is Changed!");

      // gh-pages용
      window.location.replace("/jswitter");
    }
  };

  // 프로필 닉네임 변경
  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
          maxLength="30"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
