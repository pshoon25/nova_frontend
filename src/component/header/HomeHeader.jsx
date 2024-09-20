import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/HomeHeader.css";
import headerLogo from "../../images/nova_text.png";
import { api } from "../../api/api.js";
import Announcement from "../popup/Announcement.jsx";
import Announcement2 from "../popup/Announcement2.jsx";

function HomeHeader(props) {
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로를 가져오기 위해 useLocation 사용
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;
  const agencyName = loginInfo ? loginInfo.agencyName : null;
  const userType = loginInfo ? loginInfo.userType : null;

  // 팝업창
  const todayDate = new Date().toLocaleDateString();
  const [modalVisible, setModalVisible] = useState(() => {
    const visitedBeforeDate = localStorage.getItem("VisitCookie");
    return visitedBeforeDate !== todayDate; // 만약 오늘 방문한 기록이 없다면 true 반환
  });

  const closeModal = () => {
    setModalVisible(false);
  };

  // 팝업창2
  const [modalVisible2, setModalVisible2] = useState(() => {
    const visitedBeforeDate = localStorage.getItem("VisitCookie2");
    return visitedBeforeDate !== todayDate; // 만약 오늘 방문한 기록이 없다면 true 반환
  });

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  useEffect(() => {
    const pathToMenuMap = {
      "/main": "노바미션관리",
      "/main/novaMission": "노바미션관리",
      "/main/olockMission": "오락미션관리",
      "/main/pointManage": "포인트관리",
      "/main/agencyManage": "대행사관리",
    };

    // URL 경로에 따라 selectedMenu 설정
    const currentMenu = pathToMenuMap[location.pathname] || "";
    setSelectedMenu(currentMenu);
    localStorage.setItem("selectedMenu", currentMenu);
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행

  const handleMenuClick = (menu, path) => {
    setSelectedMenu(menu);
    localStorage.setItem("selectedMenu", menu);
    navigate(path);
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      // 쿠키 삭제
      await api.post("/logout");

      // 로컬 스토리지에서 로그인 정보 삭제
      localStorage.removeItem("loginInfo");
      // 로그아웃 시 메뉴 선택 상태 초기화
      localStorage.removeItem("selectedMenu");

      // 로그인 화면으로 이동
      navigate("/login");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="homeHeader">
      {modalVisible && (
        <Announcement
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        ></Announcement>
      )}

      {modalVisible2 && (
        <Announcement2
          visible={modalVisible2}
          closable={true}
          maskClosable={true}
          onClose={closeModal2}
        ></Announcement2>
      )}
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
            onClick={() =>
              handleMenuClick("오락미션관리", "/main/olockMission")
            }
          >
            오락미션관리
          </span>
          <span
            className={`headerMenuItem ${
              selectedMenu === "포인트관리" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("포인트관리", "/main/pointManage")}
          >
            포인트관리
          </span>
          {userType === "ADMIN" && (
            <span
              className={`headerMenuItem ${
                selectedMenu === "대행사관리" ? "active" : ""
              }`}
              onClick={() =>
                handleMenuClick("대행사관리", "/main/agencyManage")
              }
            >
              대행사관리
            </span>
          )}
        </div>
        <div className="headerUserDiv">
          <span>{agencyName}</span>
          <span className="headerMenuItem" onClick={handleLogout}>
            로그아웃
          </span>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
