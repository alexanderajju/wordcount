import axios from "axios";

// api handling
const instance = axios.create({
  baseURL: "https://count1245a.herokuapp.com/",
});

export default instance;
