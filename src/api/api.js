import axios from "axios";

const url = "http://localhost:8080";
//const url = "http://orummmedia-backend:8080";

const api = axios.create({
  baseURL: url,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export { api, url };
