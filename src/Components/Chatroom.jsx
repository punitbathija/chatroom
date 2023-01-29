import React, { useEffect, useRef, useState } from "react";
import "./Chatroom.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
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
import { ArrowDownwardRounded } from "@mui/icons-material";
import spinner from "../Assets/spinner.svg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inptutText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const colRef = collection(db, "messages");
  const messagesBottom = useRef(null);

  console.log(messages);
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

  async function logOut() {
    await signOut(getAuth()).then(console.log("Logged Out"));
  }

  async function uploadImage() {
    if (file === null) return;
    try {
      const messageRef = await addDoc(collection(getFirestore(), "messages"), {
        name: getAuth().currentUser.displayName,
        imageUrl: spinner,
        profilePicture: getAuth().currentUser.photoURL || user.photoUrl,
        timestamp: serverTimestamp(),
      });

      const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${
        file.name
      }`;

      const imageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(imageRef, file);
      const downloadImageUrl = await getDownloadURL(imageRef);
      console.log(downloadImageUrl);

      await updateDoc(messageRef, {
        imageUrl: downloadImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });
    } catch (error) {
      console.error(
        "Someting went wrong while uploading the image to server" + error
      );
    }
  }
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

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
                imageUrl,
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
                image={imageUrl}
              />
            )
          )}
        </FlipMove>
        <div ref={messagesBottom} />
      </div>

      <div className="input">
        <ArrowDownwardRounded onClick={scrollToBottom} />
        <label htmlFor="image">
          <AddAPhotoIcon />
        </label>
        <input
          id="image"
          type="file"
          className="imageInput"
          onChange={handleFile}
        />
        {file && (
          <div
            onClick={() => {
              if (file === null) return;
              uploadImage();
              setFile(null);
            }}
          >
            <IosShareIcon />
          </div>
        )}
        <div>
          <InsertEmoticonIcon />
        </div>
        <form onSubmit={sendChat} className="sendChat">
          <input
            type="text"
            placeholder="enter text here"
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
