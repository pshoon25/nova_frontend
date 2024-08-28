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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const PointManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [constName, setConstName] = useState("");
  const [open, setOpen] = useState(false);
  const [pointAmount, setPointAmount] = useState("");
  const [depositorName, setDepositorName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userType = loginInfo ? loginInfo.userType : null;
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;

  const getPointHistoryList = async () => {
    try {
      const params = {
        agencyName: constName,
        status: statusFilter !== "All" ? statusFilter : undefined,
      };

      const response = await api.get("/point/getPointHistoryList", { params });
      const data = response.data;

      const formattedData = data.map((el) => ({
        pointHistoryNo: el.pointHistoryNo || "",
        reward: el.reward || "",
        agencyName: el.agencyName || "",
        missionNo: el.missionNo || "",
        content: el.content || "",
        points: el.points || "",
        registerDateTime: el.registerDateTime || "",
        status: formatStatus(el.status),
        depositor: el.depositor || "",
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    ...(userType === "ADMIN"
      ? [{ field: "agencyName", headerName: "대행사명", width: 200 }]
      : []),
    { field: "pointHistoryNo", headerName: "이력번호", width: 200 },
    { field: "reward", headerName: "리워드", width: 100 },
    { field: "missionNo", headerName: "미션번호", width: 200 },
    { field: "content", headerName: "내역", width: 250 },
    { field: "points", headerName: "포인트", width: 100 },
    { field: "registerDateTime", headerName: "일자", width: 200 },
    { field: "status", headerName: "비고", width: 100 },
    ...(userType === "ADMIN"
      ? [{ field: "depositor", headerName: "입금자명", width: 200 }]
      : []),
  ];

  const formatStatus = (status) => {
    switch (status) {
      case "REQUEST":
        return "충전요청";
      case "RECHARGE":
        return "충전";
      case "DEDUCTION":
        return "차감";
      case "REFUND":
        return "환급";
      default:
        return "";
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const requestPointRecharge = async () => {
    try {
      const response = await api.post("/point/requestPointRecharge", {
        params: {
          agencyCode: agencyCode,
          points: pointAmount,
          depositorName: depositorName,
        },
      });

      handleClose();
      getPointHistoryList();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const approvalRecharge = async () => {
    try {
      if (selectedRows.length === 0) {
        alert("선택된 항목이 없습니다.");
        return;
      }

      const approvalPromises = selectedRows.map(async (row) => {
        try {
          const response = await api.post("/point/approveRecharge", {
            pointHistoryNo: row.pointHistoryNo,
          });
          return response.data;
        } catch (error) {
          console.error(
            `Error approving recharge for row: ${row.pointHistoryNo}`,
            error
          );
          throw error;
        }
      });

      await Promise.all(approvalPromises);

      console.log("All selected rows have been successfully approved.");
      getPointHistoryList();
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to approve recharge for selected rows:", error);
    }
  };

  useEffect(() => {
    getPointHistoryList();
  }, []);

  useEffect(() => {
    getPointHistoryList();
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
                onChange={(e) => setStatusFilter(e.target.value)}
                label="상태"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="REQUEST">충전요청</MenuItem>
                <MenuItem value="RECHARGE">충전</MenuItem>
                <MenuItem value="DEDUCTION">차감</MenuItem>
                <MenuItem value="REFUND">환급</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="actionBtns">
            {userType === "AGENCY" && (
              <button
                type="button"
                className="addButton"
                onClick={handleClickOpen}
              >
                포인트 충전
              </button>
            )}
            {userType === "ADMIN" && (
              <button
                type="button"
                className="saveButton"
                onClick={approvalRecharge}
              >
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
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            style={{ height: 600 }}
            checkboxSelection
            autoHeight
            isRowSelectable={(params) => params.row.status === "충전요청"}
            onRowSelectionModelChange={(newSelection) => {
              const selectedIds = new Set(newSelection);
              const selectedRows = rows.filter((row) =>
                selectedIds.has(row.pointHistoryNo)
              );
              setSelectedRows(selectedRows);

              // 선택된 항목 로깅
              console.log("Selected rows: ", selectedRows);
            }}
          />
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>포인트 충전</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="포인트 금액"
            type="number"
            fullWidth
            variant="outlined"
            value={pointAmount}
            onChange={(e) => setPointAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            label="입금자명"
            type="text"
            fullWidth
            variant="outlined"
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className="addButton" onClick={requestPointRecharge}>
            충전
          </button>
          <button className="addButton" onClick={handleClose}>
            취소
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PointManage;
