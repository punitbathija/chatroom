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
    onAuthStateChanged(getAuth);
  }

  return (
    <div className="chatroom">
      <div className="profile">
        {/* <AccountCircleIcon className="icons" fontSize="large" /> */}
        <div>{getProfilePicUrl}</div>
        <p>{getUserName}</p>
        <LogoutIcon className="icons" fontSize="large" onClick={logOut} />
      </div>
      <div className="chats"></div>
    </div>
  );
}

export default Chatroom;
