import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); // JWT 검증 상태 관리

  // JWT Validation Check
  async function jwtValidateCheck() {
    try {
      const response = await api.get("/jwtCheck");
      const data = response.data;

      console.log(data);

      if (data === undefined || data.result === "Logout") {
        // 토큰 만료 시 처리
        alert("토큰이 만료되었습니다. 다시 로그인해주시기 바랍니다.");

        // 로컬 스토리지에서 로그인 정보 삭제
        localStorage.removeItem("loginInfo");

        // 로그인 페이지로 이동
        navigate("/login");

        return false;
      } else {
        // Access Token 업데이트
        if (data.accessToken) {
          updateAccessToken(data.accessToken);
        }
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }

  // Access Token 업데이트 함수
  function updateAccessToken(accessToken) {
    let loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) {
      let loginInfoObj = JSON.parse(loginInfo);
      loginInfoObj.accessToken = accessToken;
      localStorage.setItem("loginInfo", JSON.stringify(loginInfoObj));
    }
  }

  useEffect(() => {
    const checkAuthorization = async () => {
      const isValid = await jwtValidateCheck();
      setIsAuthorized(isValid); // JWT 검증 결과를 상태에 저장
    };

    checkAuthorization(); // 컴포넌트가 마운트될 때 JWT 유효성 검사
  }, [navigate]);

  if (isAuthorized === null) {
    // JWT 검증이 완료될 때까지 로딩 상태를 표시하거나 null을 반환
    return null;
  }

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;

  if (!agencyCode) {
    // 경고 메시지 표시
    alert("로그인 후 이용이 가능합니다.");

    // 일정 시간 후에 리다이렉트 (alert 이후 실행되도록)
    setTimeout(() => {
      navigate("/login");
    }, 0);

    return null; // 아무것도 렌더링하지 않음
  }

  return element; // 인증된 경우 요소 반환
};

export default PrivateRoute;
