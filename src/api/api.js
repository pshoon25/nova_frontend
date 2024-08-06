import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export const api = async (method, url, data) => {
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Access-Control-Allow-Origin": `http://localhost:3000`,
    "Access-Control-Allow-Credentials": "true",
  };
  const response = await axios({
    method,
    url,
    data,
    headers,
  });
  return response;
};
