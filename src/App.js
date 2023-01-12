import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import firebaseConfig from "./config/firebase.config";
import { initializeApp } from "firebase/app";
import Chatroom from "./Components/Chatroom";
import Home from "./Components/Home";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Messages from "./Components/Messages";

function App() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="App">
      {/* <Home /> */}
      <Login />
      <Signup />
      <Chatroom />
    </div>
  );
}
export default App;
