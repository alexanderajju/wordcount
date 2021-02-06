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
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Globlex.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto text-white">
            {user ? (
              <Link to="/result" style={{ textDecoration: "none" }}>
                <span className="result">Results</span>
              </Link>
            ) : (
              <h1></h1>
            )}
          </Nav>
          <Nav>
            {user ? (
              <div className="header__imageDiv">
                <img
                  className="header__image"
                  src={user.photo}
                  variant="info"
                />
                <h5>Logout</h5>
              </div>
            ) : (
              <Nav.Link onClick={signIn}>Login </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
