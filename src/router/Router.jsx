import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import Login from '../component/login/Login';
import Home from '../component/home/Home'; // 새로운 자식 컴포넌트 예시

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로에서 로그인 페이지로 리다이렉션 */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        {/* 메인 레이아웃 및 다른 경로 */}
        <Route path="/app" element={<MainLayout />}>
          {/* 메인 레이아웃의 기본 자식 경로 */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;