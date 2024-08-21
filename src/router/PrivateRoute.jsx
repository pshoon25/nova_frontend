import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  const agencyCode = loginInfo ? loginInfo.agencyCode  : null;

  if (!agencyCode) {
    // 경고 메시지 표시
    alert("로그인 후 이용이 가능합니다.");
    
    // 일정 시간 후에 리다이렉트 (alert 이후 실행되도록)
    setTimeout(() => {
      navigate('/login');
    }, 0);
    
    return <></>; // 렌더링할 요소를 반환하지 않음
  }

  return (
    <Route
      {...rest}
      element={element}
    />
  );
};

export default PrivateRoute;
