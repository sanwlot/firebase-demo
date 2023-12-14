import "./Auth.css";
import { auth, googleProvider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function signin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        navigate("home");
      })
      .catch((error) => {
        alert(error.code, error.message);
      });
  }

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(userCredential.user.email);
        setEmail("");
        setPassword("");
        navigate("home");
      })
      .catch((error) => {
        alert(error.code, error.message);
      });
  }

  function signInWithGooglePopUp() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setEmail("");
        setPassword("");
        console.log("logged in with google");
        navigate("home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login">
      <h1>FIREBASE TUTORIAL</h1>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="login__btns">
        <button onClick={signin}>Sign in</button>
        <button onClick={register}>Register</button>
        <button onClick={signInWithGooglePopUp}>Sign in with Google</button>
      </div>
    </div>
  );
}
