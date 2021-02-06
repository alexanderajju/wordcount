import React from "react";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Result from "./Result";
import { useEffect } from "react";
import axios from "./axios";
import { selectUser, setUser, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  // user session handling
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        axios.post("/user", authUser).then((response) => {
          if (response) {
            dispatch(
              setUser({
                uid: response.data.providerId,
                photo: response.data.photoURL,
                email: response.data.email,
                displayName: response.data.displayName,
                _id: response.data._id,
              })
            );
          }
        });
      } else {
        dispatch(logout);
      }
    });
  }, []);

  return (
    // Routes
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/result">
            <Header />
            <Result />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
