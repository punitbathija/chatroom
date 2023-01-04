import React from "react";
import "./Chatroom.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Chatroom() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

  function logOut() {
    signOut(getAuth());
  }

  function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || <AccountCircleIcon />;
  }

  function getUserName() {
    return getAuth().currentUser.displayName;
  }

  function initFirebaseAuth() {
    console.log(onAuthStateChanged(getAuth));
  }

  return (
    <div className="chatroom">
      <div className="profile">
        <AccountCircleIcon className="icons" fontSize="large" />
        <p>Punit Bathija</p>
        <LogoutIcon className="icons" fontSize="large" onClick={logOut} />
      </div>
      <div className="chats">
        <div className="contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Chetan</p>
        </div>
        <p className="message">
          This a test message and this chatroom is litt!
        </p>
        <div className="contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Chetan</p>
        </div>
        <p className="message">
          This a test message and this chatroom is litt!
        </p>
        <div className="contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Chetan</p>
        </div>
        <p className="message">
          This a test message and this chatroom is litt!
        </p>
        <div className="my-contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Punit</p>
        </div>
        <p className="my-message">This is also a test message</p>
        <div className="my-contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Punit</p>
        </div>
        <p className="my-message">This is also a test message</p>
        <div className="my-contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Punit</p>
        </div>
        <p className="my-message">This is also a test message</p>
      </div>
      <div className="input">
        <input type="text" className="text-input" />
      </div>
    </div>
  );
}

export default Chatroom;
