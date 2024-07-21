import { Outlet } from "react-router-dom";
import HomeHeader from "../header/HomeHeader";

const MainLayout = () => {
  return (
    <div>
      <HomeHeader />
      <Outlet />
    </div>
  );
};

export default MainLayout;
