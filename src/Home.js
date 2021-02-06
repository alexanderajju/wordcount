import React from "react";
import "./Home.css";
import { useEffect } from "react";
import { selectUser, setUser, logout } from "./features/userSlice";
import { selectCount, setCount } from "./features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { useState } from "react";
import axios from "./axios";

function Home() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const user = useSelector(selectUser);
  const history = useHistory();

  const sendMessage = (e) => {
    // sending website link to backend using axios
    e.preventDefault();
    const article = { url: url, userid: user._id };
    axios.post("/", article).then(async (response) => {
      dispatch(
        // adding to redux store
        setCount({
          count: response.data.wordLength,
        })
      );
      // console.log(url);
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>resposne", response.data);
      setUrl("");
      await history.push("result");
    });
  };

  return (
    <div className="home">
      <div className="word__count col-md-12">
        <div className="col-md-6">
          <h1 className="h1-text">
            Unable to check
            <br /> your website <br /> word count
          </h1>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2UZ8N0cj2B3mnq0w30Ham4PW8z6oGKCgwg&usqp=CAU" />
        </div>
      </div>

      <form action="">
        <input
          value={url}
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          className="sm-2"
          placeholder="Enter your website URL Eg.https://www.growth.cx"
        />
        {user ? (
          <button disabled={!user} className="insights" onClick={sendMessage}>
            Get Insights
          </button>
        ) : (
          <h1>Login</h1>
        )}
      </form>
    </div>
  );
}

export default Home;
