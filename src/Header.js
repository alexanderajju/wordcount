import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { auth, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser, logout } from "./features/userSlice";
import { avatar } from "react-bootstrap";
import "./Header.css";

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
          <Nav className="mr-auto"></Nav>
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
