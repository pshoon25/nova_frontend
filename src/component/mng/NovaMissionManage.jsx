import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import "../../css/MissionManage.css";
import { api } from "../../api/api.js";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const NovaMissionManage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("전체");
  const [rows, setRows] = useState([]);
  const [pointsData, setPointsData] = useState({
    currentPoints: 0,
    placeTraffic: 0,
    placeSave: 0,
    placeSavePremium: 0,
  });

  const [constName, setConstName] = useState("");

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const addMission = () => {
    navigate("/main/addMission");
  };

  const getAgencyMissionListByAgencyName = async () => {
    try {
      const response = await api.get(
        "/mission/getAgencyMissionListByAgencyName",
        {
          params: { agencyName: constName },
        }
      );
      const data = response.data;
      const formattedData = data.map((el, index) => ({
        id: index + 1,
        agencyName: el.agencyName || "N/A",
        kind: el.missionType || "N/A",
        type: el.missionCategory || "N/A",
        mid: el.placeMid || "N/A",
        adStartDate: el.adStartDate || "N/A",
        dailyWorkload: el.dailyWorkload || "N/A",
        totalWorkdays: el.totalWorkdays || "N/A",
        rankKeyword: el.rankKeyword || "N/A",
        searchKeyword: el.searchKeyword || "N/A",
        adEndDate: el.adEndDate || "N/A",
        placeAddress: el.placeAddress || "N/A",
        totalRequests: el.totalRequest || "N/A",
        missionStatus: el.missionStatus || "N/A",
      }));
      setRows(formattedData);
      // 대행사 포인트 조회
      getAgencyPointByAgencyName();
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const getAgencyPointByAgencyName = async () => {
    try {
      const response = await api.get("/point/getAgencyPointByAgencyName", {
        params: { agencyName: constName },
      });

      const data = response.data[0];

      setPointsData({
        currentPoints: response.data.length > 1 ? 0 : data.availablePoints,
        placeTraffic: response.data.length > 1 ? 0 : data.placeTraffic,
        placeSave: response.data.length > 1 ? 0 : data.placeSave,
        placeSavePremium: response.data.length > 1 ? 0 : data.placeSavePremium,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    getAgencyMissionListByAgencyName();
  }, []);

  const columns = [
    { field: "id", headerName: "No", width: 30 },
    { field: "agencyName", headerName: "대행사", width: 50 },
    { field: "kind", headerName: "종류", width: 100 },
    { field: "type", headerName: "유형", width: 100 },
    { field: "mid", headerName: "mid", width: 100 },
    { field: "adStartDate", headerName: "광고시작일", width: 100 },
    { field: "dailyWorkload", headerName: "1일작업량", width: 100 },
    { field: "totalWorkdays", headerName: "총작업일수", width: 100 },
    { field: "rankKeyword", headerName: "순위키워드", width: 100 },
    { field: "searchKeyword", headerName: "검색키워드", width: 100 },
    { field: "adEndDate", headerName: "광고종료일", width: 100 },
    { field: "placeAddress", headerName: "플레이스주소", width: 100 },
    { field: "totalRequests", headerName: "총요청량", width: 100 },
    { field: "missionStatus", headerName: "미션상태", width: 70 },
    { field: "manage", headerName: "관리", width: 70 },
  ];

  return (
    <div className="mainContainerDiv">
      <div className="missionManageDiv">
        <h2 className="menuTitle">노바 미션 관리</h2>
        <div className="missionMngStatusDiv">
          <table>
            <thead>
              <tr>
                <th>현재 포인트</th>
                <th>트래픽</th>
                <th>트래픽 + 저장하기</th>
                <th>트래픽 + 저장하기(프리미엄)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pointsData.currentPoints}P</td>
                <td>{pointsData.placeTraffic}P</td>
                <td>{pointsData.placeSave}P</td>
                <td>{pointsData.placeSavePremium}P</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="actionBtns">
          <div className="searchDiv">
            <div>
              <TextField
                className="textField"
                label="대행사명"
                variant="outlined"
                size="small"
                value={constName}
                onChange={(e) => setConstName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && getAgencyMissionListByAgencyName()
                }
              />
              <button
                className="searchButton"
                onClick={getAgencyMissionListByAgencyName}
              >
                검색
              </button>
            </div>
            <div className="typeButtons">
              <b>타입</b>
              <button
                className={`typeButton ${
                  activeType === "전체" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("전체")}
              >
                전체
              </button>
              <button
                className={`typeButton ${
                  activeType === "트래픽" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("트래픽")}
              >
                트래픽
              </button>
              <button
                className={`typeButton ${
                  activeType === "저장하기" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("저장하기")}
              >
                저장하기
              </button>

              <button
                className={`typeButton ${
                  activeType === "저장하기(프리미엄)" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("저장하기(프리미엄)")}
              >
                저장하기(프리미엄)
              </button>
            </div>
          </div>

          <div className="actionBtns">
            <button type="button" className="addButton" onClick={addMission}>
              미션 추가
            </button>
            <button type="button" className="downloadButton">
              엑셀 다운로드
            </button>
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

export default NovaMissionManage;
