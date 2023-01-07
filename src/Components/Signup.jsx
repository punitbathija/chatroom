import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Signup.css";
import GoogleIcon from "@mui/icons-material/Google";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useDispatch();

  async function signUp() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        updateProfile(userCredentials.user, {
          displayName: displayName,
        });
        console.log(userCredentials.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signupWGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((userCredentials) => {
      dispatch(
        login({
          email: userCredentials.user.email,
          uid: userCredentials.user.uid,
          displayName: userCredentials.user.displayName,
        })
      );
      console.log(userCredentials.user);
    });
  }

  return (
    <div className="signin">
      <form className="form">
        Sign Up
        <TextField
          color="error"
          id="outlined-basic"
          label="display name"
          variant="outlined"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          color="error"
          id="outlined-basic"
          label="email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          color="error"
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="error" variant="contained" fullWidth onClick={signUp}>
          Sign Up
        </Button>
        <Button
          color="error"
          variant="contained"
          fullWidth
          onClick={signupWGoogle}
        >
          <GoogleIcon className="icon" />
          Sign up With Google
        </Button>
        <small>
          Registered? <a>Log in</a>
        </small>
      </form>
    </div>
  );
}

export default Signup;
