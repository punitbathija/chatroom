import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

  async function login() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        console.log("Signed in");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function loginWGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const user = provider;
  }

  return (
    <div className="login">
      <form className="option">
        Login
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
        <Button color="error" variant="contained" fullWidth onClick={login}>
          Login
        </Button>
        <Button
          color="error"
          variant="contained"
          fullWidth
          onClick={loginWGoogle}
        >
          <GoogleIcon className="icon" />
          Login With Google
        </Button>
        <small>
          Not Registered? <a>Sign Up</a>
        </small>
      </form>
    </div>
  );
}

export default Login;
