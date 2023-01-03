import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Button color="error" variant="contained" fullWidth>
          Login
        </Button>
        <Button color="error" variant="contained" fullWidth>
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
