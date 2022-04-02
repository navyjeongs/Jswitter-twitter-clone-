import React, { useEffect, useRef, useState } from "react";
import Jsweet from "../components/Jsweet";
import { dbService, storageService } from "../fBase";
import { v4 as uuidv4 } from "uuid";
import JsweetFactory from "../components/JsweetFactory";

const Home = ({ userObj }) => {
  // firebase에 jsweets들 가져오기
  const [jsweets, setJsweets] = useState([]);

  //onSnapshot은 변화를 알아차림
  useEffect(() => {
    dbService
      .collection("jsweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const jsweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJsweets(jsweetArray);
      });
  }, []);

  return (
    <div className="container">
      <JsweetFactory userObj={userObj} />

      <div style={{ marginTop: 30 }}>
        {jsweets.map((jsweet) => (
          // jsweet한 uid와 접속한 uid가 같다면 true를 전달함
          <Jsweet
            key={jsweet.id}
            jsweetObj={jsweet}
            isOwner={jsweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
