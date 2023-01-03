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
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

  async function signUp() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        console.log("signed up");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signupWGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const user = provider;
  }

  return (
    <div className="signin">
      <form className="form">
        Sign Up
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

export default Login;
