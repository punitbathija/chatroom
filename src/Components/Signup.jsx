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
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState(null);
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useDispatch();

  async function signUp() {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // const date = new Date().getTime();
    const profilePictureRef = ref(getStorage(), `${displayName + v4()}`);

    await uploadBytesResumable(profilePictureRef, file).then(() => {
      getDownloadURL(profilePictureRef).then(async (downloadUrl) => {
        await updateProfile(res.user, {
          displayName: displayName,
          photoURL: downloadUrl,
        });
      });

      dispatch(
        login({
          email: res.user.email,
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        })
      );
      console.log("User Signed Up" + res.user);
      const userRef = addDoc(collection(getFirestore(), "users"), {
        email: email,
        uid: res.user.uid,
        displayName: displayName,
        photoURL: photoURL,
      });
    });
    await setDoc(doc(getFirestore(), "userChats", res.user.uid), {});
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
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

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
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          color="error"
          id="outlined-basic"
          label="Display Name"
          variant="outlined"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <div className="profilePicture">
          <input
            id="image"
            type="file"
            className="imageInput"
            onChange={handleFile}
          />
          <label htmlFor="image" className="box">
            <MonochromePhotosIcon />
            Add a Profile Picture
          </label>
        </div>
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
