import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export const api = async (method, url, data) => {
  const response = await axios({
    method,
    url,
    data,
    headers,
  });
  return response;
};
