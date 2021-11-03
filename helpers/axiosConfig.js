import axios from "axios";
const instance = axios.create({
  baseURL: "http://3.144.31.214/api/",
});

export default instance;
