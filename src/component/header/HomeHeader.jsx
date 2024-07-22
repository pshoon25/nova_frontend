import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HomeHeader.css";

function HomeHeader(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logic for handling logout, e.g., clearing user data, redirecting to login, etc.
    navigate("/login");
  };

  const handleMissionManage = () => {
    navigate("/main"); // Ensure this is the correct route for the MissionManage page
  };

  const handlePointManage = () => {
    navigate("/pointManage"); // Ensure this is the correct route for the PointManage page
  };

  return (
    <div className="homeHeader">
      <nav className="homeHeaderNav">
        <button className="headerLogoDiv" onClick={handleMissionManage}>
          오름미디어
        </button>
        <div className="headerMenuDiv">
          <button onClick={handleMissionManage}>미션관리</button>
          <button onClick={handlePointManage}>포인트관리</button>
          <button>대행사관리</button>
        </div>
        <div className="headerUserDiv">
          <span>홍길동</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
