import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export const api = async (method, url, data = null) => {
  try {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    };

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};
