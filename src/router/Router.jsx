import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import Login from '../component/login/Login';
import Home from '../component/home/Home'; // 새로운 자식 컴포넌트 예시

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;