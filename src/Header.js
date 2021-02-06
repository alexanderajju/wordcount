import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { auth, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser, logout } from "./features/userSlice";

import "./Header.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function Header() {
  // user signin using firebase
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  const user = useSelector(selectUser);
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <span className="globex">
            Gl<span style={{ color: "#0d8bfc" }}>o</span>bex
          </span>
          <span className="com">.com</span>
        </div>
      </Link>
      {user ? (
        <div className="header__imageDiv">
          <img className="header__image" src={user.photo} variant="info" />
        </div>
      ) : (
        <div className="login">
          <span onClick={signIn} style={{ cursor: "pointer" }}>
            Login
          </span>
        </div>
      )}
    </nav>

  );
}

export default Header;
