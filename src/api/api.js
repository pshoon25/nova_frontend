import axios from "axios";

// const url = "http://localhost:8080";
const url = "/api";

axios.defaults.withCredentials = true; // 쿠키 값을 전송한다.

const api = axios.create({
  baseURL: url,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 전 처리
api.interceptors.request.use(
  (config) => {
    // AccessToken과 RefreshToken을 로컬 스토리지에서 가져와 헤더에 추가
    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");

    if (accessToken) {
      config.headers["Access-Token"] = accessToken;
    }

    if (refreshToken) {
      config.headers["Refresh-Token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 전 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰 갱신 로직을 여기서 처리
      const refreshToken = localStorage.getItem("RefreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(`${url}/refresh-token`, {
            refreshToken: refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("AccessToken", newAccessToken);

          // 새로운 AccessToken으로 헤더 업데이트
          originalRequest.headers["AccessToken"] = newAccessToken;

          return api(originalRequest); // 요청 재시도
        } catch (error) {
          console.error("토큰 갱신 오류:", error);
          // 갱신 실패 시 로그아웃 처리 등 추가 로직 필요
        }
      }
    }

    return Promise.reject(error);
  }
);

export { api, url };
