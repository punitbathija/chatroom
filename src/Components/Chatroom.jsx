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

import handleEmojiSelect from "./emoji";
import EmojiPicker from "emoji-picker-react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function Chatroom() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const [inputText, setInputText] = useState("");
  const user = useSelector(selectUser);
  console.log(user);

  function logOut() {
    signOut(getAuth()).then(console.log("Logged Out"));
  }

  function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || <AccountCircleIcon />;
  }

  function getUserName() {
    return getAuth().currentUser.displayName;
  }

  function onAuthStateChange() {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is Active as" + currentUser);
      } else {
        console.log("User is inActive");
      }
    });
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
        {/* <img src={user.photoUrl} /> */}

        <AccountCircleIcon className="icons" fontSize="large" />
        <p>Punit Bathija</p>
        <div onClick={logOut}>
          <LogoutIcon className="icons" fontSize="large" />
        </div>
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
          {/* <EmojiPicker value={handleEmojiSelect} /> */}
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
