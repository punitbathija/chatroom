import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const disptach = useDispatch;

  // async function login(e) {
  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredentials) => {
  //       disptach(
  //         login({
  //           email: userCredentials.user.email,
  //           uid: userCredentials.user.uid,
  //           displayName: userCredentials.user.displayName,
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const login = (e) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      disptach(
        login({
          email : userCredentials.user.email,
          uid : userCredentials.user.
        })
      )
    })
  }

  async function loginWGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((userCredentials) => {
      disptach(
        login({
          email: userCredentials.user.email,
          uid: userCredentials.user.uid,
          displayName: userCredentials.user.displayName,
        })
      );
    });
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
