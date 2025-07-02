import axios from "axios";

const instance = axios.create({
  baseURL: "https://byte-bitebd.onrender.com/api",
});

export default instance;
