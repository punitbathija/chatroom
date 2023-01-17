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
    const momemtTimestamp = moment(timestamp.toDate());
    return (
      <>
        <div ref={ref} className="message">
          <div className="my-contact">
            <Avatar src={profilePicture}>{displayName[0]}</Avatar>
            <p>{displayName}</p>
          </div>
          <div className="textBody">
            <p>{text}</p>
            <small className="time">
              {momemtTimestamp.format("dddd, hh:mm")}
            </small>
          </div>
        </div>
      </>
    );
  }
);

export default Message;
