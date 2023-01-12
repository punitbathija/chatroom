import React, { forwardRef } from "react";
import "./Messages.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@mui/material";

const Message = forwardRef(
  ({ displayName, email, photoUrl, text, timestamp }, ref) => {
    const user = useSelector(selectUser);
    return (
      <div ref={ref} className="message">
        <div className="contact">
          {photoUrl && <Avatar src={photoUrl} />}
          <p>{displayName}</p>
          <small>{email}</small>
        </div>
        <p className="message">{text}</p>
        <small>{timestamp}</small>
      </div>
    );
  }
);

export default Message;
