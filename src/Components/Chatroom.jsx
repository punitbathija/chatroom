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
import moment from "moment";

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inptutText, setInputText] = useState("");

  const colRef = collection(db, "messages");

  console.log(messages);

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
    });
  }, []);

  async function sendChat(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: user.displayName,
        text: inptutText,
        profilePicture: user.photoURL || "",
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
        <p>{user.displayName}</p>
        <div onClick={logOut}>
          <LogoutIcon className="icons" fontSize="large" />
        </div>
      </div>
      <div className="chats">
        <FlipMove>
          {messages.map(
            ({ id, data: { name, email, photoUrl, text, timestamp } }) => (
              <Message
                key={id}
                displayName={name}
                email={email}
                text={text}
                photoUrl={photoUrl}
              />
            )
          )}
        </FlipMove>
      </div>

      <div className="input">
        <AddAPhotoIcon />
        <div>
          <InsertEmoticonIcon />
          {/* <EmojiPicker value={handleEmojiSelect} /> */}
        </div>
        <form onSubmit={sendChat} className="sendChat">
          <input
            type="text"
            className="text-input"
            value={inptutText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
