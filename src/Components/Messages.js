import React, { forwardRef, useRef, useState, useEffect } from "react";
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
import spinner from "../Assets/spinner.svg";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const Message = forwardRef(
  (
    { displayName, email, profilePicture, text, timestamp, uid, image },
    ref
  ) => {
    const user = useSelector(selectUser);
    const messagesBottom = useRef(null);
    const date = timestamp ? timestamp.toDate() : null;
    const [isLoading, setIsLoading] = useState(true);
    let time;

    useEffect(() => {
      if (timestamp) setIsLoading(false);
    }, [timestamp]);

    useEffect(() => {
      messagesBottom.current?.scrollIntoView();
    }, [isLoading]);

    if (isLoading) {
      return (time = <img src={spinner} className="spinner" />);
    } else {
      time = (
        <small className="time">{moment(date).format("dddd, hh:mm")}</small>
      );
    }

    return (
      <>
        <div className="message">
          <div
            className={`my-contact${
              displayName === auth.currentUser.displayName ? "sent" : "received"
            }`}
          >
            <Avatar src={profilePicture}>{displayName[0]}</Avatar>
            <p>{displayName}</p>
          </div>
          <div
            className={`textBody${
              displayName === auth.currentUser.displayName ? "sent" : "received"
            }`}
          >
            <p>{text}</p>
            if()
            <img src={image} className="photo"></img>
            <hr className="line" />
            <small
              className={`time${
                displayName === auth.currentUser.displayName
                  ? "sent"
                  : "received"
              }`}
            >
              {time}
            </small>
          </div>
          <div ref={messagesBottom} />
        </div>
      </>
    );
  }
);

export default Message;
