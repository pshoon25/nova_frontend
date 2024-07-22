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

  const handlePointnManage = () => {
    navigate("pointManage"); // Ensure this is the correct route for the MissionManage page
  };

  return (
    <div className="homeHeader">
      <nav className="homeHeaderNav">
        <a className="headerLogoDiv" onClick={handleMissionManage}>
          오름미디어
        </a>
        <div className="headerMenuDiv">
          <a onClick={handleMissionManage}>미션관리</a>
          <a onClick={handlePointnManage}>포인트관리</a>
          <a>대행사관리</a>
        </div>
        <div className="headerUserDiv">
          <a>홍길동</a>
          <a onClick={handleLogout}>로그아웃</a>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
