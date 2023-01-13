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
      <>
        <div ref={ref} className="message">
          <div className="my-contact">
            <Avatar src={photoUrl}></Avatar>
            <p>{user.displayName}</p>
          </div>
          <div className="textBody">
            <p>{text}</p>
          </div>
        </div>
      </>
    );
  }
);

export default Message;
