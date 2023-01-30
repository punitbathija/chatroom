import React, { useEffect, useState } from "react";
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
import spinner from "./Assets/spinner.svg";

function App() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState("");
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

  useEffect(() => {
    if ((<Chatroom />)) setIsLoading(false);
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          {isLoading ? <img src={spinner} className="spinner" /> : <Chatroom />}
        </div>
      )}
      <Signup />
    </div>
  );
}
export default App;
