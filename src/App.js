import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import firebaseConfig from "./config/firebase.config";
import { initializeApp } from "firebase/app";
import Chatroom from "./Components/Chatroom";
import Home from "./Components/Home";

function App() {
  const firebase = initializeApp(firebaseConfig);
  return (
    <div className="App">
      <Home />
      <Login />
      <Signup />
      <Chatroom />
    </div>
  );
}
export default App;
