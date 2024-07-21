import React, { useState } from "react";
import styles from "../../css/Common.css";
import styles2 from "../../css/MissionManage.css";
import { DataGrid } from "@mui/x-data-grid";

const MissionManage = () => {
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

  // 상태 정의
  const [activeType, setActiveType] = useState("전체");

  // 클릭 핸들러
  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  return (
    <div className="mainContainerDiv">
      <div className="mainDiv">
        <h2 className="menuTitle">미션관리</h2>
        <div className="searchContainer">
          <b>검색어</b>
          <select>
            <option>상품명</option>
            <option>옵션</option>
            <option>mid</option>
          </select>
          <input type="text" />
          <button>검색</button>
        </div>
        <div className="typeContainer">
          <b>타입</b>
          <button
            className={`typeButton ${activeType === "전체" ? "active" : ""}`}
            onClick={() => handleTypeClick("전체")}
          >
            전체
          </button>
          <button
            className={`typeButton ${
              activeType === "플레이스킵" ? "active" : ""
            }`}
            onClick={() => handleTypeClick("플레이스킵")}
          >
            플레이스킵
          </button>
          <button
            className={`typeButton ${
              activeType === "플레이스저장" ? "active" : ""
            }`}
            onClick={() => handleTypeClick("플레이스저장")}
          >
            플레이스저장
          </button>
          <button
            className={`typeButton ${
              activeType === "플레이스트래픽" ? "active" : ""
            }`}
            onClick={() => handleTypeClick("플레이스트래픽")}
          >
            플레이스트래픽
          </button>
          <button
            className={`typeButton ${
              activeType === "플레이스검색저장" ? "active" : ""
            }`}
            onClick={() => handleTypeClick("플레이스검색저장")}
          >
            플레이스검색저장
          </button>
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
        <div className="dataGridContainer">
          <DataGrid
            rows={rows}
            columns={columns}
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
          <button>추가</button>
        </div>
      </div>
    </div>
  );
};

export default MissionManage;
