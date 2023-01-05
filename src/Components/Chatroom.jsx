import React, { useState } from "react";
import "./Chatroom.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import EmojiPicker from "emoji-picker-react";

function Chatroom() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const [inputText, setInputText] = useState("");

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

  function sendChat() {
    return (
      <div>
        <div className="my-contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Punit</p>
        </div>
        <p className="my-message">{inputText}</p>
      </div>
    );
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
        <AddAPhotoIcon />
        <div>
          <InsertEmoticonIcon />
        </div>
        <input
          type="text"
          className="text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div onClick={sendChat}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
