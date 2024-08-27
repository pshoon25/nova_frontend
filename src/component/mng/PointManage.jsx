import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../api/api.js";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const PointManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [statusFilter, setstatusFilter] = useState("All");
  const [constName, setConstName] = useState("");
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  const userType  = loginInfo ? loginInfo.userType  : null;

  const getPointHistoryList = async () => {
    try {
      const params = {
        agencyName: constName,
        status: statusFilter !== "All" ? statusFilter : undefined,
      };

      const response = await api.get("/point/getPointHistoryList", { params });

      const data = response.data;

      const formattedData = data.map((el) => ({
        pointHistoryNo: el.pointHistoryNo || "N/A",
        reward: el.reward || "N/A",
        agencyName: el.agencyName || "N/A",
        missionNo: el.missionNo || "N/A",
        content: el.content || "N/A",
        points: el.points || "N/A",
        registerDateTime: el.registerDateTime || "N/A",
        status: formatStatus(el.status),
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 컬럼 정의
  const columns = [
    ...(userType === "ADMIN"
      ? [{ field: "agencyName", headerName: "대행사명", width: 200 }]
      : []),
    { field: "reward", headerName: "리워드", width: 200 },
    { field: "missionNo", headerName: "미션번호", width: 100 },
    { field: "content", headerName: "내역", width: 250 },
    { field: "points", headerName: "포인트", width: 100 },
    { field: "registerDateTime", headerName: "사용일", width: 200 },
    { field: "status", headerName: "비고", width: 100 },
  ];

  const formatStatus = (status) => {
    switch (status) {
      case "request":
        return "충전요청";
      case "recharge":
        return "충전";
      case "deduction":
        return "차감";
      case "refund":
        return "환급";
      default:
        return "N/A";
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    getPointHistoryList();
  }, []);

  useEffect(() => {
    getAgencyMissionList();
  }, [statusFilter]);

  return (
    <div className="mainContainerDiv">
      <div className="pointManageDiv">
        <h2 className="menuTitle">포인트 관리</h2>
        <div className="actionBtns">
          <div className="searchDiv">
            {userType === "ADMIN" && (
              <TextField
                className="textField"
                label="대행사명"
                variant="outlined"
                size="small"
                value={constName}
                onChange={(e) => setConstName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getPointHistoryList()}
              />
            )}
            {userType === "ADMIN" && (
              <button className="searchButton" onClick={getPointHistoryList}>
                검색
              </button>
            )}
            <FormControl
              className="formControl"
              variant="outlined"
              size="small"
            >
              <InputLabel>상태</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setstatusFilter(e.target.value)}
                label="상태"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="request">충전요청</MenuItem>
                <MenuItem value="recharge">충전</MenuItem>
                <MenuItem value="deduction">차감</MenuItem>
                <MenuItem value="refund">환급</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="actionBtns">
            {userType === "ADMIN" && (
              <button type="button" className="addButton">
                포인트 충전
              </button>
            )}
            {userType === "AGENCY" && (
              <button type="button" className="saveButton">
                충전 승인
              </button>
            )}
          </div>
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
