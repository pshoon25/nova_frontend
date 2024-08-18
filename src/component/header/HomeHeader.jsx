import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HomeHeader.css";
import headerLogo from "../../images/nova_text.png";

function HomeHeader(props) {
  const [selectedMenu, setSelectedMenu] = useState("미션관리");
  const navigate = useNavigate();

  const handleMenuClick = (menu, path) => {
    setSelectedMenu(menu);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="homeHeader">
      <nav className="homeHeaderNav">
        <img
          src={headerLogo}
          alt="headerLogo"
          className="headerLogo"
          draggable="false"
          onClick={() => handleMenuClick("노바미션관리", "/main")}
        />
        <div className="headerMenuDiv">
          <span
            className={`headerMenuItem ${
              selectedMenu === "노바미션관리" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("노바미션관리", "/main")}
          >
            노바미션관리
          </span>
          <span
            className={`headerMenuItem ${
              selectedMenu === "오락미션관리" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("오락미션관리", "olockMission")}
          >
            오락미션관리
          </span>
          <span
            className={`headerMenuItem ${
              selectedMenu === "포인트관리" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("포인트관리", "pointManage")}
          >
            포인트관리
          </span>
          <span
            className={`headerMenuItem ${
              selectedMenu === "대행사관리" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("대행사관리", "agencyManage")}
          >
            대행사관리
          </span>
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
