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
        <Avatar src={photoUrl} className="my-contact"></Avatar>
        <div className="textBody">
          <p>{displayName}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  }
);

export default Message;
