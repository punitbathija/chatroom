import React, { useEffect, useState } from "react";
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
import FlipMove from "react-flip-move";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import Message from "./Messages";

const Chatroom = () => {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const [messages, setMessages] = useState([]);
  const [inptutText, setInputText] = useState("");
  // const [prevText, setPrevText] = useState("");

  const colRef = collection(db, "messages");
  const recentMessages = query(
    collection(db, "messages"),
    orderBy("timestamp", "desc"),
    limit(40)
  );
  const user = useSelector(selectUser);
  console.log(user);

  // async function displayMessages() {
  //   const dbData = await onSnapshot(recentMessages, colRef, (snapshot) => {
  //     setMessages(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //     console.log(messages);
  //   });
  // }

  useEffect(() => {
    const dbData = onSnapshot(recentMessages, colRef, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // async function deleteMessage() {
  //   console.log("hello");
  // }

  async function logOut() {
    await signOut(getAuth()).then(console.log("Logged Out"));
  }

  async function sendChat(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: user.displayName,
        text: inptutText,
        profilePicture: user.photoUrl || "",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error, "Error sending the message");
    }
    setInputText("");
  }

  return (
    <div className="chatroom">
      <div className="profile">
        <AccountCircleIcon className="icons" fontSize="large" />
        <p>Punit Bathija</p>
        <div onClick={logOut}>
          <LogoutIcon className="icons" fontSize="large" />
        </div>
      </div>
      <div className="chats">
        {messages.map(
          ({ id, data: { displayName, email, photoUrl, text, timestamp } }) => (
            <Message
              key={id}
              displayName={displayName}
              email={email}
              photoUrl={photoUrl}
              text={text}
              timestamp={timestamp}
            />
          )
        )}
        {/* <div className="contact">
          <AccountCircleIcon className="icon" fontSize="large" />
          <p>Chetan</p>
        </div>
        <p className="message">
          This a test message and this chatroom is litt!
        </p> */}

        {/* <div className="contact">
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
        <p className="my-message">This is also a test message</p> */}
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
          value={inptutText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div onClick={sendChat} type="submit">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
