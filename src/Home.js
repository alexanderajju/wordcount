import React from "react";
import "./Home.css";
import { selectUser, setUser, logout } from "./features/userSlice";
import { selectCount, setCount } from "./features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "./axios";
import office from "./office.png";

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
    <div>
      <div className="office">
        <div className="work">
          <span className="unable">
            Unable to check
            <br />
            your webpage
            <br />
            word count?
          </span>
          <span className="guide">
            No worries!<span style={{ color: "#0d8bfc" }}> Globex</span> will
            guide you!
          </span>
        </div>
        <div className="image">
          <img src={office} alt="" />
        </div>
      </div>
      <div class="input">
        <span class="input__text">
          Check the last time when you checked the webpage word count.
        </span>
        <div class="input__group">
          <input
            class="input__box"
            value={url}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL Eg.https://www.growth.cx"
            type="text"
          />
          <button onClick={sendMessage} class="input__button">
            Get insights
          </button>
        </div>
      </div>
    </div>

  );
}

export default Home;
