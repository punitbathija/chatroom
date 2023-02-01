import { Search } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import "./Sidebar.css";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";

import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  const currentUser = useSelector(selectUser);

  console.log(currentUser);

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("");
  };
  const handldeSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => setUser(doc.data()));
      console.log(user);
      console.log(userName);
    } catch (err) {
      setErr(true);
    }
  };

  const handldeKey = (e) => {
    e.code === "Enter" && handldeSearch();
  };

  return (
    <div className="sidebar">
      <div className="search">
        <input
          type="text"
          placeholder="Find a User"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handldeKey}
          value={userName}
        />
        <Search />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL || user.photoUrl} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
