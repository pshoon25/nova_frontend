import axios from "axios";

const url = "http://localhost:8080";
// const url = "/api";

const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
const accessToken = loginInfo ? loginInfo.accessToken : null;

axios.defaults.withCredentials = true; // 쿠키 값을 전송한다.

const api = axios.create({
  baseURL: url,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Token": accessToken,
  },

  withCredentials: true,
});

export { api, url };
