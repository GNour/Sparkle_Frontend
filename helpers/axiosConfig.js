import axios from "axios";
const instance = axios.create({
  baseURL: "https://sparkletms.tk/api/",
});

export default instance;
