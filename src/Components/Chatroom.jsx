import React, { useEffect, useState } from "react";
import "./Chatroom.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
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

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inptutText, setInputText] = useState("");

  const colRef = collection(db, "messages");

  const recentMessages = query(
    collection(db, "messages"),
    orderBy("timestamp"),
    limit(2000)
  );

  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    const dbData = onSnapshot(recentMessages, colRef, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log(messages);
    });
  }, []);

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

  async function logOut() {
    await signOut(getAuth()).then(console.log("Logged Out"));
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
              text={text}
              photoUrl={photoUrl}
            />
          )
        )}
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
