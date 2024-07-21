import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main");
  };

  return (
    <div class="loginDiv">
      <div class="headerDiv" />
      <div class="formContainer">
        <form class="loginForm">
          <h2 class="menuTitle">로그인</h2>
          <p>아이디</p>
          <input class="loginInput" type="text" />
          <p>비밀번호</p>
          <input class="loginInput" type="password" />
          <button class="loginBtn" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
