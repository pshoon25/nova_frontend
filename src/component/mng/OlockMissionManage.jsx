import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import "../../css/MissionManage.css";
import { api } from "../../api/api.js";
import { TextField } from "@mui/material";

const OlockMissionManage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("");
  const [rows, setRows] = useState([]);
  const [constName, setConstName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [pointsData, setPointsData] = useState({
    availablePoints: 0,
    olockPlaceSearch: 0,
    olockPlaceSearchSave: 0,
    olockPlaceSearchSavePremium: 0,
    olockPlaceKeep: 0,
    olockSmartstoreSearch: 0,
  });

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;
  const userType = loginInfo ? loginInfo.userType : null;

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  useEffect(() => {
    getAgencyMissionList();
  }, [activeType]);

  const addMission = () => {
    navigate("/addOlockMission", { state: { pointsData } });
  };

  const getAgencyMissionList = () => {
    if (userType === "ADMIN") {
      getAgencyMissionListByAgencyName();
    } else if (userType === "AGENCY") {
      getAgencyMissionListByAgencyCode();
    }
  };

  const getAgencyMissionListByAgencyName = async () => {
    try {
      const response = await api.get(
        "/mission/getAgencyMissionListByAgencyName",
        {
          params: {
            agencyName: constName,
            reward: "OLOCK",
            itemName: activeType,
          },
        }
      );
      const data = response.data;
      const formattedData = data.map((el, index) => ({
        id: index + 1,
        reward: el.reward || "",
        agencyName: el.agencyName || "",
        itemName:
          el.itemName === "PLACE_SEARCH"
            ? "플레이스 검색"
            : el.itemName === "PLACE_SEARCH_SAVE"
            ? "플레이스 검색 + 저장"
            : el.itemName === "PLACE_SEARCH_SAVE_PREMIUM"
            ? "플레이스 검색 + 저장(프리미엄)"
            : el.itemName === "PLACE_KEEP"
            ? "플레이스 킵"
            : el.itemName === "SMARTSTORE_SEARCH"
            ? "스마트스토어 검색"
            : "",
        type: el.itemName.startsWith("PLACE")
          ? "PLACE"
          : el.itemName.startsWith("SMARTSTORE")
          ? "SMARTSTORE"
          : "",
        mid: el.mid || "",
        priceComparisonId: el.priceComparisonId || "",
        adStartDate: el.adStartDate || "",
        dailyWorkload: el.dailyWorkload || "",
        totalWorkdays: el.totalWorkdays || "",
        placeName: el.placeName || "",
        rankKeyword: el.rankKeyword || "",
        mainSearchKeyword: el.mainSearchKeyword || "",
        subSearchKeyword: el.subSearchKeyword || "",
        adEndDate: el.adEndDate || "",
        placeUrl: el.placeUrl || "",
        totalRequest: el.totalRequest || "",
        missionStatus: el.missionStatus || "",
      }));
      setRows(formattedData);
      // 대행사 포인트 조회
      getAgencyPointByAgencyName();
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const getAgencyMissionListByAgencyCode = async () => {
    try {
      const response = await api.get(
        "/mission/getAgencyMissionListByAgencyCode",
        {
          params: {
            agencyCode: agencyCode,
            placeName: placeName,
            reward: "OLOCK",
            itemName: activeType,
          },
        }
      );
      const data = response.data;

      const formattedData = data.map((el, index) => ({
        id: index + 1,
        agencyName: el.agencyName || "",
        itemName:
          el.itemName === "PLACE_SEARCH"
            ? "플레이스 검색"
            : el.itemName === "PLACE_SEARCH_SAVE"
            ? "플레이스 검색 + 저장"
            : el.itemName === "PLACE_SEARCH_SAVE_PREMIUM"
            ? "플레이스 검색 + 저장(프리미엄)"
            : el.itemName === "PLACE_KEEP"
            ? "플레이스 킵"
            : el.itemName === "SMARTSTORE_SEARCH"
            ? "스마트스토어 검색"
            : "",
        type: el.itemName.startsWith("PLACE")
          ? "PLACE"
          : el.itemName.startsWith("SMARTSTORE")
          ? "SMARTSTORE"
          : "",
        mid: el.mid || "",
        priceComparisonId: el.priceComparisonId || "",
        adStartDate: el.adStartDate || "",
        dailyWorkload: el.dailyWorkload || "",
        totalWorkdays: el.totalWorkdays || "",
        placeName: el.placeName || "",
        rankKeyword: el.rankKeyword || "",
        mainSearchKeyword: el.mainSearchKeyword || "",
        subSearchKeyword: el.subSearchKeyword || "",
        adEndDate: el.adEndDate || "",
        placeUrl: el.placeUrl || "",
        totalRequest: el.totalRequest || "",
        missionStatus: el.missionStatus || "",
      }));

      setRows(formattedData);
      // 대행사 포인트 조회
      getAgencyPointByAgencyName();
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const getAgencyPoint = () => {
    if (userType === "ADMIN") {
      getAgencyPointByAgencyName();
    } else if (userType === "AGENCY") {
      getAgencyPointByAgencyCode();
    }
  };

  const getAgencyPointByAgencyName = async () => {
    try {
      const response = await api.get("/point/getAgencyPointByAgencyName", {
        params: { agencyName: constName },
      });

      const data = response.data;

      setPointsData({
        availablePoints: data.availablePoints || 0,
        olockPlaceSearch: data.olockPlaceSearch || 0,
        olockPlaceSearchSave: data.olockPlaceSearchSave || 0,
        olockPlaceSearchSavePremium: data.olockPlaceSearchSavePremium || 0,
        olockPlaceKeep: data.olockPlaceKeep || 0,
        olockSmartstoreSearch: data.olockSmartstoreSearch || 0,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };

  const getAgencyPointByAgencyCode = async () => {
    try {
      const response = await api.get("/point/getAgencyPointByAgencyCode", {
        params: { agencyCode: agencyCode },
      });

      const data = response.data;

      setPointsData({
        availablePoints: data.availablePoints || 0,
        olockPlaceSearch: data.olockPlaceSearch || 0,
        olockPlaceSearchSave: data.olockPlaceSearchSave || 0,
        olockPlaceSearchSavePremium: data.olockPlaceSearchSavePremium || 0,
        olockPlaceKeep: data.olockPlaceKeep || 0,
        olockSmartstoreSearch: data.olockSmartstoreSearch || 0,
      });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getAgencyMissionList();
    getAgencyPoint();
  }, []);

  const columns = [
    { field: "id", headerName: "No", width: 30 },
    ...(userType === "ADMIN"
      ? [{ field: "agencyName", headerName: "대행사", width: 50 }]
      : []),
    { field: "itemName", headerName: "종류", width: 100 },
    { field: "mid", headerName: "mid", width: 100 },
    { field: "priceComparisonId", headerName: "가격비교 ID", width: 100 },
    { field: "adStartDate", headerName: "광고시작일", width: 100 },
    { field: "dailyWorkload", headerName: "1일작업량", width: 100 },
    { field: "totalWorkdays", headerName: "총작업일수", width: 100 },
    { field: "placeName", headerName: "플레이스명", width: 100 },
    { field: "rankKeyword", headerName: "순위키워드", width: 100 },
    { field: "mainSearchKeyword", headerName: "메인검색 키워드", width: 100 },
    {
      field: "correctAnswer",
      headerName: "정답(주변-명소 1번째)",
      width: 200,
    },
    { field: "adEndDate", headerName: "광고종료일", width: 100 },
    { field: "placeUrl", headerName: "플레이스주소", width: 100 },
    { field: "totalRequest", headerName: "총요청량", width: 100 },
    { field: "missionStatus", headerName: "미션상태", width: 70 },
    { field: "manage", headerName: "관리", width: 70 },
  ];

  return (
    <div className="mainContainerDiv">
      <div className="missionManageDiv">
        <h2 className="menuTitle">오락 미션 관리</h2>
        <div className="missionMngStatusDiv">
          <table>
            <thead>
              <tr>
                <th>현재 포인트</th>
                <th>플레이스 검색</th>
                <th>플레이스 검색 + 저장</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pointsData.availablePoints}P</td>
                <td>{pointsData.olockPlaceSearch}P</td>
                <td>{pointsData.olockPlaceSearchSave}P</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="actionBtns">
          <div className="searchDiv">
            <div>
              {userType === "ADMIN" && (
                <TextField
                  className="textField"
                  label="대행사명"
                  variant="outlined"
                  size="small"
                  value={constName}
                  onChange={(e) => setConstName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && getAgencyMissionList()}
                />
              )}
              {userType === "AGENCY" && (
                <TextField
                  className="textField"
                  label="플레이스명"
                  variant="outlined"
                  size="small"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && getAgencyMissionList()}
                />
              )}
              <button className="searchButton" onClick={getAgencyMissionList}>
                검색
              </button>
            </div>
            <div className="typeButtons">
              <b>타입</b>
              <button
                className={`typeButton ${activeType === "" ? "active" : ""}`}
                onClick={() => handleTypeClick("")}
              >
                전체
              </button>
              <button
                className={`typeButton ${
                  activeType === "PLACE_SEARCH" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("PLACE_SEARCH")}
              >
                플레이스 검색
              </button>
              <button
                className={`typeButton ${
                  activeType === "PLACE_SEARCH_SAVE" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("PLACE_SEARCH_SAVE")}
              >
                플레이스 검색 + 저장
              </button>
            </div>
          </div>

          <div className="actionBtns">
            {userType === "AGENCY" && (
              <button type="button" className="addButton" onClick={addMission}>
                미션 추가
              </button>
            )}
            {userType === "ADMIN" && (
              <button type="button" className="downloadButton">
                엑셀 다운로드
              </button>
            )}
          </div>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default OlockMissionManage;
