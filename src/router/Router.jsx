import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import Login from '../component/login/Login';
import MissionManage from "../component/mng/MissionManage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainLayout />}>
          <Route index element={<MissionManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;