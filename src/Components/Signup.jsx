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
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useDispatch();

  async function signUp() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        updateProfile(userCredentials.user, {
          displayName: displayName,
          photoURL: photoURL,
        });
        dispatch(
          login({
            email: userCredentials.user.email,
            uid: userCredentials.user.uid,
            displayName: userCredentials.user.displayName,
            photoURL: userCredentials.user.photoURL,
          })
        );
        console.log("User Signed Up" + userCredentials.user);
        const userRef = addDoc(collection(getFirestore(), "users"), {
          email: email,
          uid: userCredentials.user.uid,
          displayName: displayName,
          photoURL: photoURL,
        });
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
          photoURL: userCredentials.user.photoURL,
        })
      );
      console.log("User Signed Up Using Google" + userCredentials.user);
      const userRef = addDoc(collection(getFirestore(), "users"), {
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
        displayName: userCredentials.user.displayName,
        photoUrl: userCredentials.user.photoURL,
      });
    });
  }

  return (
    <div className="signin">
      <form className="form">
        Sign Up
        <TextField
          color="error"
          id="outlined-basic"
          label="Email"
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
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          color="error"
          id="outlined-basic"
          label="Display name"
          variant="outlined"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          color="error"
          id="outlined-basic"
          label="Profile picture link"
          variant="outlined"
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
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
