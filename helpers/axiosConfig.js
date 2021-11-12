import axios from "axios";
const instance = axios.create({
  baseURL: "https://3.144.31.214/api/",
});

export default instance;
