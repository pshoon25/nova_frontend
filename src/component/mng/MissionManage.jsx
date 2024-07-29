import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import "../../css/MissionManage.css";

const MissionManage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("전체");

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const addMission = () => {
    navigate("/main/addMission");
  };

  // 샘플 데이터
  const rows = [
    {
      id: 1,
      currentPoints: "867,250P",
      placeSkip: "35P",
      placeSave: "25P",
      placeTraffic: "35P",
      placeSearchSave: "45P",
    },
    {
      id: 2,
      currentPoints: "100,000P",
      placeSkip: "50P",
      placeSave: "30P",
      placeTraffic: "40P",
      placeSearchSave: "60P",
    },
    {
      id: 3,
      currentPoints: "200,000P",
      placeSkip: "25P",
      placeSave: "20P",
      placeTraffic: "30P",
      placeSearchSave: "40P",
    },
  ];

  // 컬럼 정의
  const columns = [
    { field: "currentPoints", headerName: "현재 포인트", width: 150 },
    { field: "placeSkip", headerName: "플레이스 킵", width: 150 },
    { field: "placeSave", headerName: "플레이스 저장", width: 150 },
    { field: "placeTraffic", headerName: "플레이스 트래픽", width: 150 },
    { field: "placeSearchSave", headerName: "플레이스 검색저장", width: 150 },
  ];

  return (
    <div className="mainContainerDiv">
      <div className="missionManageDiv">
        <h2 className="menuTitle">미션관리</h2>
        <div className="searchDiv">
          <div>
            <select>
              <option>상품명</option>
              <option>옵션</option>
              <option>mid</option>
            </select>
            <input type="text" />
            <button>검색</button>
          </div>
          <div>
            <button
              className={activeType === "전체" ? "active" : ""}
              onClick={() => handleTypeClick("전체")}
            >
              전체
            </button>
            <button
              className={activeType === "플레이스킵" ? "active" : ""}
              onClick={() => handleTypeClick("플레이스킵")}
            >
              플레이스킵
            </button>
            <button
              className={activeType === "플레이스저장" ? "active" : ""}
              onClick={() => handleTypeClick("플레이스저장")}
            >
              플레이스저장
            </button>
            <button
              className={activeType === "플레이스트래픽" ? "active" : ""}
              onClick={() => handleTypeClick("플레이스트래픽")}
            >
              플레이스트래픽
            </button>
            <button
              className={activeType === "플레이스검색저장" ? "active" : ""}
              onClick={() => handleTypeClick("플레이스검색저장")}
            >
              플레이스검색저장
            </button>
          </div>
        </div>
        <div className="missionMngStatusDiv">
          <table>
            <thead>
              <tr>
                <th>현재 포인트</th>
                <th>플레이스 킵</th>
                <th>플레이스 저장</th>
                <th>플레이스 트래픽</th>
                <th>플레이스 검색저장</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>867,250P</td>
                <td>35P</td>
                <td>25P</td>
                <td>35P</td>
                <td>45P</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows        ={rows}
            columns     ={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
        <div>
          <button onClick={addMission}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default MissionManage;
