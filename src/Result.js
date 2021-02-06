import React from "react";
import { selectCount, setCount } from "./features/counterSlice";
import { selectUser, setUser, logout } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { useEffect } from "react";
import axios from "./axios";
import "./Result.css";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const $ = require("jquery");
$.DataTable = require("datatables.net");

function Result() {
  const count = useSelector(selectCount);
  const user = useSelector(selectUser);
  const [data, setdata] = useState([]);
  const [liked, setLiked] = useState([0]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  // firing useeffect to keep wordcount
  useEffect(() => {
    if (user) {
      axios
        .get("/userwordlist", {
          params: {
            user: user._id,
          },
        })
        .then((response) => {
          setdata(response.data.products);
          setLiked(response.data.fav);
          console.log("resposne>>>>>>>>>>>>>>>>>>>", response);
        });
    }
  }, [user]);

  const deleteItem = (id) => {
    // delete request to back end
    axios
      .post("/deleteuserword", {
        params: {
          id: id,
          user: user,
        },
      })
      .then((response) => {
        history.go(0);
      });
  };

  const setFav = (id) => {
    // console.log("fav", id);
    // adding to fav
    axios
      .post("/setfav", {
        params: {
          id: id,
          user: user,
        },
      })
      .then((response) => {
        history.go(0);
      });
  };
  const setunfav = (id) => {
    // console.log(id);
    // removing from Fav
    axios
      .post("/setUnfav", {
        params: {
          id: id,
          user: user,
        },
      })
      .then((response) => {
        if (response) {
          history.go(0);
        }
      });
  };

  return (
    <div className="container">
      <div className="heading">
        <h1> Word Count Result</h1>
      </div>
      <div>
        <h3 className="growth">growth.cx</h3>
      </div>
      {count ? (
        <div className="result__countDiv">
          <div>
            <h1>Total Word Count</h1>
            <div className="result__count">{count}</div>
          </div>

          <div className="result__description">
            <h4>"WooHoo! You're doing a good job"</h4>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <Table id="table_id" striped>
          <thead>
            <tr>
              <th>URL</th>
              <th>Word Count</th>
              <th>Actions</th>
              <th>fav</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((dat) => (
                <tr key={dat._id}>
                  <td>{dat.url}</td>
                  <td>{dat.wordCount}</td>
                  <td>
                    <DeleteIcon onClick={() => deleteItem(dat._id)} />
                  </td>
                  <td>
                    {liked ? (
                      liked.findIndex((data) => data === dat._id) >= 0 ? (
                        // checking previously added
                        <FavoriteIcon onClick={(e) => setunfav(dat._id)} />
                      ) : (
                        <FavoriteBorderIcon onClick={(e) => setFav(dat._id)} />
                      )
                    ) : (
                      <FavoriteBorderIcon onClick={(e) => setFav(dat._id)} />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Result;
