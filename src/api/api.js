import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const api = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};
