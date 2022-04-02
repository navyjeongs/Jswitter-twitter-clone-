import React, { useEffect, useState } from "react";
import { autoService } from "../fBase";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);

  // 사용자 알기 위해
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    autoService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing....."
      )}
    </>
  );
}

export default App;
