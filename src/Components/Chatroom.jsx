import React, { useEffect, useRef, useState } from "react";
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
import { Avatar } from "@mui/material";
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
import { ArrowDownwardRounded } from "@mui/icons-material";
import spinner from "../Assets/spinner.svg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inptutText, setInputText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const colRef = collection(db, "messages");
  const messagesBottom = useRef(null);

  console.log(messages);
  console.log(imageUpload);
  const recentMessages = query(
    collection(db, "messages"),
    orderBy("timestamp"),
    limit(2000)
  );

  const user = useSelector(selectUser);
  console.log(user);
  console.log(getAuth().currentUser);

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

  useEffect(() => {
    messagesBottom.current.scrollIntoView();
  }, [(db, messages, inptutText, user)]);

  const scrollToBottom = () => {
    messagesBottom.current?.scrollIntoView();
  };

  async function sendChat(e) {
    e.preventDefault();
    if (inptutText === "") return;
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

  const saveImageMessage = async (file) => {};

  async function logOut() {
    await signOut(getAuth()).then(console.log("Logged Out"));
  }

  async function uploadImage(file) {
    if (imageUpload == null) return;
    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        name: user.displayName,
        imageUrl: spinner,
        profilePicture: user.photoURL || "",
        timestamp: serverTimestamp(),
      });

      const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${
        file.name
      }`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      const publicImageUrl = await getDownloadURL(newImageRef);

      await updateDoc(messageRef, {
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });
    } catch (error) {
      console.log(error, "Error sending the message");
    }
  }
  return (
    <div className="chatroom">
      <div className="profile">
        <Avatar src={user.photoUrl} className="icons">
          {user.displayName[0]}
        </Avatar>

        <p>{user.displayName}</p>
        <div onClick={logOut}>
          <LogoutIcon className="icons" fontSize="large" />
        </div>
      </div>
      <div className="chats">
        <FlipMove>
          {messages.map(
            ({
              id,
              data: {
                name,
                email,
                profilePicture,
                text,
                timestamp,
                photoURL,
                uid,
              },
            }) => (
              <Message
                key={id}
                uid={uid}
                displayName={name}
                email={email}
                text={text}
                profilePicture={profilePicture}
                photoURL={photoURL}
                timestamp={timestamp}
              />
            )
          )}
        </FlipMove>
        <div ref={messagesBottom} />
      </div>

      <div className="input">
        <ArrowDownwardRounded onClick={scrollToBottom} />
        <div className="imgUpload" onClick={uploadImage}>
          <label htmlFor="image">
            <AddAPhotoIcon />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="imageInput"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <InsertEmoticonIcon />
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
