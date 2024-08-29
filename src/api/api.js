import axios from "axios";

// const url = "http://localhost:8080";
const url = "/api";

const accessToken = localStorage.getItem("AccessToken");
const refreshToken = localStorage.getItem("RefreshToken");

axios.defaults.withCredentials = true; // 쿠키 값을 전송한다.

const api = axios.create({
  baseURL: url,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // AccessToken: accessToken,
    // RefreshToken: refreshToken,
  },

  withCredentials: true,
});

export { api, url };
