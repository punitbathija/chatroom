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

  const handldeSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDocs(db, "chats", combinedId);
      if (!res.exsist()) {
        await setDoc(doc, (db, "chats", combinedId), { messages: [] });
      }
    } catch (err) {
      console.log(err);
    }
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
        />
        <Search />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handldeSelect}>
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
