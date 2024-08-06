import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const api = async (method, url, data) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
