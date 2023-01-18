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
  ({ displayName, email, profilePicture, text, timestamp }, ref) => {
    const user = useSelector(selectUser);
    // const clearDate = timestamp.toDate().toString();
    // const momemtTimestamp = moment(timestamp.toDate());
    var date = moment(timestamp.toDate()).format("dddd, hh:mm");

    return (
      <>
        <div ref={ref} className="message">
          <div className="my-contact">
            <Avatar src={profilePicture}>{displayName[0]}</Avatar>
            <p>{displayName}</p>
          </div>
          <div className="textBody">
            <p>{text}</p>
            <small className="time">{date}</small>
          </div>
        </div>
      </>
    );
  }
);

export default Message;
