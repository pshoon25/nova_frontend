import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HomeHeader.css";
import headerLogo from "../../images/nova_cutout.png";

function HomeHeader(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleMissionManage = () => {
    navigate("/main");
  };

  const handlePointManage = () => {
    navigate("pointManage");
  };

  return (
    <div className="homeHeader">
      <nav className="homeHeaderNav">
        <img
          src={headerLogo}
          alt="headerLogo"
          className="headerLogo"
          onClick={handleMissionManage}
        />
        <div className="headerMenuDiv">
          <span className="headerMenuItem" onClick={handleMissionManage}>
            미션관리
          </span>
          <span className="headerMenuItem" onClick={handlePointManage}>
            포인트관리
          </span>
          <span className="headerMenuItem">대행사관리</span>
        </div>
        <div className="headerUserDiv">
          <span>홍길동</span>
          <span className="headerMenuItem" onClick={handleLogout}>
            로그아웃
          </span>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
