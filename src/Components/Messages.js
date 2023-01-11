import React, { forwardRef } from "react";
import "./Messages.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Messages = forwardRef(({ displayName, emai, photoUrl }, ref) => {
  const user = useSelector(selectUser);
  console.log(user.photoUrl);
  return (
    <div ref={ref} className="message">
      <div className="contact">
        <AccountCircleIcon />
        <p>{user.displayName}</p>
      </div>
      <p className="message">This a test message and this chatroom is litt!</p>
    </div>
  );
});

export default Messages;
