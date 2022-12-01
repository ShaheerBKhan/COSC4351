import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8888/routes",
  withCredentials: true,
  credentials: "include",
});