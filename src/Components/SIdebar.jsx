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

function Sidebar() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);

  const handldeSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => setUser(doc.data()));
      console.log(querySnapshot);
    } catch (err) {
      setErr(true);
    }
  };

  const handldeKey = (e) => {
    e.code === "Enter" && handldeSearch();
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

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
        <div className="userChat">
          <img src={user.photoUrl} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
