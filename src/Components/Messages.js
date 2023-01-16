import React, { forwardRef } from "react";
import "./Messages.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@mui/material";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../config/firebase.config";
import { doc } from "firebase/firestore";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const Message = forwardRef(
  ({ displayName, email, photoUrl, text, timestamp }, ref) => {
    const user = useSelector(selectUser);

    return (
      <>
        <div ref={ref} className="message">
          <div className="my-contact">
            <Avatar src={getAuth().currentUser.photoURL}></Avatar>
            <p>{getAuth().currentUser.displayName}</p>
          </div>
          <div className="textBody">
            <p>{text}</p>
          </div>
          {/* <p>{console.log(getAuth().currentUser.timestamp)}</p> */}
        </div>
      </>
    );
  }
);

export default Message;
