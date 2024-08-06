import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
export const api = async (method, url, data) => {
  const response = await axios({
    method,
    data,
    url,
  }).catch((e) => alert(e.response.data));
  return response;
};
