import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../api/api.js";

const PointManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [constName, setConstName] = useState("");

  // 데이터 가져오기
  useEffect(() => {
    getPointHistoryList();
  }, []);

  const getPointHistoryList = async () => {
    setStatus("loading");
    try {
      const response = await api.get("/point/getPointHistoryList", {
        params: { agencyName: constName },
      });
      const data = response.data;

      const formattedData = data.map((el) => ({
        pointHistoryNo: el.pointHistoryNo || "N/A",
        agencyName: el.agencyName || "N/A",
        missionNo: el.missionNo || "N/A",
        content: el.content || "N/A",
        points: el.points || "N/A",
        registerDateTime: el.registerDateTime || "N/A",
        status: el.status || "N/A",
      }));
      setRows(formattedData);
      setStatus("succeeded");
    } catch (error) {
      console.error("Error fetching agency data:", error);
      setError(error.message);
      setStatus("failed");
    }
  };

  // 컬럼 정의
  const columns = [
    { field: "agencyName", headerName: "대행사명", width: 200 },
    { field: "missionNo", headerName: "미션번호", width: 100 },
    { field: "content", headerName: "내역", width: 250 },
    { field: "points", headerName: "포인트", width: 100 },
    { field: "registerDateTime", headerName: "사용일", width: 200 },
    { field: "status", headerName: "비고", width: 100 },
  ];

  return (
    <div className="mainContainerDiv">
      <div className="pointManageDiv">
        <h2 className="menuTitle">포인트 관리</h2>
        <div className="searchDiv">
          <div>
            <input
              type="text"
              placeholder="대행사명"
              id="constName"
              onChange={(e) => setConstName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getPointHistoryList()}
            />
            <button onClick={getPointHistoryList}>검색</button>
          </div>
        </div>
        <div className="actionBtns">
          <button type="button">포인트 충전</button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.pointHistoryNo}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            style={{ height: 600 }}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default PointManage;
