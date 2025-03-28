import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
