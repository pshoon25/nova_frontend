import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import "../../css/MissionManage.css";
import { api } from "../../api/api.js";

const MissionManage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("전체");

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const addMission = () => {
    navigate("/main/addMission");
  };

  const onSubmit = async (e) => {
    const response = await api("GET", "/mission/test");
    console.log(response);
  };

  const rows = [
    {
      id: 1,
      kind: "종류1",
      type: "유형1",
      mid: "MID1",
      adStartDate: "2024-07-31",
      dailyWorkload: "100P",
      workDate: "2024-08-01",
      rankKeyword: "키워드1",
      searchKeyword: "검색어1",
      adEndDate: "2024-08-31",
      placeAddress: "주소1",
      totalRequests: "200P",
      missionStatus: "완료",
      manage: "관리1",
    },
    {
      id: 2,
      kind: "종류2",
      type: "유형2",
      mid: "MID2",
      adStartDate: "2024-07-31",
      dailyWorkload: "200P",
      workDate: "2024-08-01",
      rankKeyword: "키워드2",
      searchKeyword: "검색어2",
      adEndDate: "2024-08-31",
      placeAddress: "주소2",
      totalRequests: "300P",
      missionStatus: "진행중",
      manage: "관리2",
    },
    {
      id: 3,
      kind: "종류3",
      type: "유형3",
      mid: "MID3",
      adStartDate: "2024-07-31",
      dailyWorkload: "150P",
      workDate: "2024-08-01",
      rankKeyword: "키워드3",
      searchKeyword: "검색어3",
      adEndDate: "2024-08-31",
      placeAddress: "주소3",
      totalRequests: "250P",
      missionStatus: "대기중",
      manage: "관리3",
    },
  ];

  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "No", width: 30 },
    { field: "kind", headerName: "종류", width: 100 },
    { field: "type", headerName: "유형", width: 100 },
    { field: "mid", headerName: "mid", width: 100 },
    { field: "adStartDate", headerName: "광고시작일", width: 100 },
    { field: "dailyWorkload", headerName: "1일작업량", width: 100 },
    { field: "workDate", headerName: "작업일", width: 100 },
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
        <h2 className="menuTitle">미션 관리</h2>
        <div className="searchDiv">
          <div>
            <h3>검색어</h3>
            <select>
              <option>상품명</option>
              <option>대행사명</option>
            </select>
            <input type="text" />
            <button onClick={onSubmit}>검색</button>
          </div>
          <div>
            <b>타입</b>
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
                <th>트래픽</th>
                <th>트래픽 + 저장하기</th>
                <th>트래픽 + 저장하기(프리미엄)</th>
                <th>오락/시럽 트래픽</th>
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

        <div styleName="addMissionBtnDiv">
          <button type="button">엑셀 다운로드</button>
          <button type="button" onClick={addMission}>
            추가
          </button>
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

export default MissionManage;
