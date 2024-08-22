import "../../css/Login.css";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../images/nova_text.png";
import { api } from "../../api/api.js";
import React, { useState } from "react";

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Validation Check
  const login_validationCheck = (e) => {
    e.preventDefault();

    if (!loginId) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    Login_checkLoginIdPw();
  };

  // 로그인
  const Login_checkLoginIdPw = async () => {
    try {
      const response = await api.get("/login", {
        params: {
          loginId: loginId,
          password: password
        }
      });

      // 로그인 실패
      if (response.data.failed) {
        if (response.data.failed === 'Id Failed') {
          alert("사용자 아이디가 존재하지 않습니다.");
        } else if (response.data.failed === 'Pw Failed') {
          alert("비밀번호가 일치하지 않습니다. 다시한번 확인 바랍니다.");
        } else if (response.data.failed === 'Stop Using') {
          alert("사용이 정지된 계정입니다. 담당자에게 문의 바랍니다.");
        } else if (response.data.failed === 'Delete User') {
          alert("삭제된 계정입니다. 담당자에게 문의 바랍니다.");
        }
      } else {
        // 로그인 성공
        loginSuccess(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginSuccess = (response) => {
    // 로그인 성공 후 정보 Local Storage에 저장
    const loginInfo = {};
    loginInfo.agencyCode = response.agencyCode;
    loginInfo.agencyName = response.agencyName;
    loginInfo.userType = response.userType;
    loginInfo.accessToken = response.accessToken;

    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));

    // 페이지 이동
    navigate("/main");
  };

  return (
    <div className="loginDiv">
      <img
        src={loginLogo}
        alt="loginLogo"
        className="loginLogo"
        draggable="false"
      />
      <div className="formContainer">
        <form className="loginForm" onSubmit={login_validationCheck}>
          <h2 className="menuTitle">로그인</h2>
          <p>아이디</p>
          <input
            className="loginInput"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <p>비밀번호</p>
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginBtn" type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
