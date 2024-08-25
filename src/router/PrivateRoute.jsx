import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
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
