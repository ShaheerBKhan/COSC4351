import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8888/controller",
  withCredentials: true,
  credentials: "include",
});
