import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import Login from "../component/login/Login";
import NovaMissionManage from "../component/mng/NovaMissionManage";
import AddNovaMission from "../component/mng/AddNovaMission";
import PointManage from "../component/mng/PointManage";
import AgencyManage from "../component/mng/AgencyManage";
import AddAgency from "../component/mng/AddAgency";
import OlockMissionManage from "../component/mng/OlockMissionManage";
import AddOlockMission from "../component/mng/AddOlockMission";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<PrivateRoute element={<MainLayout />} />}>
          <Route path="/main" element={<Navigate to="novaMission" />} />
          <Route path="novaMission" element={<NovaMissionManage />} />
          <Route path="olockMission" element={<OlockMissionManage />} />
          <Route path="addNovaMission" element={<AddNovaMission />} />
          <Route path="addOlockMission" element={<AddOlockMission />} />
          <Route path="pointManage" element={<PointManage />} />
          <Route path="agencyManage" element={<AgencyManage />} />
          <Route path="addAgency" element={<AddAgency />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
