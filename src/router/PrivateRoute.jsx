import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js"; // API 호출을 위한 임포트

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const agencyCode = loginInfo ? loginInfo.agencyCode : null;

    const checkJwtValidation = async () => {
      if (!agencyCode) {
        alert("로그인 후 이용이 가능합니다.");
        navigate("/login");
        return;
      }

      try {
        const params = {
          url: "/int/user/jwtCheck.do",
          userMngCode: loginInfo.userMngCode,
        };
        const response = await api.post("/common/queryExecute", params);

        if (response === undefined || response.result === "Logout") {
          // 토큰이 만료된 경우 처리
          alert("토큰이 만료되었습니다. 다시 로그인해주시기 바랍니다.");
          localStorage.removeItem("loginInfo");
          navigate("/login");
          location.reload();
        } else {
          // Access Token이 있다면 갱신
          if (response.accessToken) {
            updateAccessToken(response.accessToken);
          }
          setIsAuthenticated(true); // 인증 성공
        }
      } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("loginInfo");
        navigate("/login");
      }
    };

    checkJwtValidation();
  }, [navigate]);

  const updateAccessToken = (accessToken) => {
    let loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) {
      let loginInfoObj = JSON.parse(loginInfo);
      loginInfoObj.accessToken = accessToken;
      localStorage.setItem("loginInfo", JSON.stringify(loginInfoObj));
    }
  };

  if (!isAuthenticated) {
    return null; // 인증이 완료되지 않은 경우 아무것도 렌더링하지 않음
  }

  return element; // 인증된 경우 요소 반환
};

export default PrivateRoute;
