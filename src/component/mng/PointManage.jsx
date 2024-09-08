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
import "../../css/Common.css";
import "../../css/PointManage.css";
import { format } from "date-fns";

const PointManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [constName, setConstName] = useState("");
  const [deducationAgnecyeName, setDeducationAgnecyeName] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeduct, setOpenDeduct] = useState(false);
  const [pointAmount, setPointAmount] = useState("");
  const [depositorName, setDepositorName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deductReason, setDeductReason] = useState(""); // 차감 사유 상태 추가
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userType = loginInfo ? loginInfo.userType : null;
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;

  const getPointHistoryList = () => {
    if (userType === "ADMIN") {
      getPointHistoryListByAgencyName();
    } else if (userType === "AGENCY") {
      getPointHistoryListByAgencyCode();
    }
  };

  const getPointHistoryListByAgencyName = async () => {
    try {
      const params = {
        agencyName: constName,
        status: statusFilter !== "All" ? statusFilter : undefined,
      };

      const response = await api.get("/point/getPointHistoryListByAgencyName", {
        params,
      });
      const data = response.data;

      const formattedData = data.map((el) => ({
        pointHistoryNo: el.pointHistoryNo || "",
        reward: el.reward || "",
        agencyName: el.agencyName || "",
        missionNo: el.missionNo || "",
        content: el.content || "",
        points: el.points || "",
        registerDateTime:
          format(new Date(el.registerDateTime), "yyyy-MM-dd HH:mm") || "",
        status: formatStatus(el.status),
        depositor: el.depositor || "",
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPointHistoryListByAgencyCode = async () => {
    try {
      const params = {
        agencyCode: agencyCode,
        status: statusFilter !== "All" ? statusFilter : undefined,
      };

      const response = await api.get("/point/getPointHistoryListByAgencyCode", {
        params,
      });
      const data = response.data;

      const formattedData = data.map((el) => ({
        pointHistoryNo: el.pointHistoryNo || "",
        reward: el.reward || "",
        agencyName: el.agencyName || "",
        missionNo: el.missionNo || "",
        content: el.content || "",
        points: el.points || "",
        registerDateTime:
          format(new Date(el.registerDateTime), "yyyy-MM-dd HH:mm") || "",
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
    // 유효성 검사
    if (!depositorName.trim()) {
      alert("입금자명을 입력하세요.");
      return;
    }

    if (!pointAmount || pointAmount <= 0) {
      alert("포인트 금액은 0보다 커야 합니다.");
      return;
    }

    try {
      const response = await api.post("/point/requestPointRecharge", {
        agencyCode: agencyCode,
        points: pointAmount,
        depositorName: depositorName,
      });

      handleClose();
      getPointHistoryList();
    } catch (error) {
      console.error("Error:", error);
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

      getPointHistoryList();
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to approve recharge for selected rows:", error);
    }
  };

  const handleClickOpenDeduct = () => {
    setOpenDeduct(true);
  };

  const handleCloseDeduct = () => {
    setOpenDeduct(false);
  };

  const pointDeduction = async () => {
    try {
      const response = await api.post("/point/pointDeduction", {
        agencyName: deducationAgnecyeName,
        points: pointAmount,
        reason: deductReason,
      });

      if (response.data === "SUCCESS") {
        alert("포인트가 차감되었습니다.");
        handleCloseDeduct();
        getPointHistoryList();
      } else if (response.data === "FAIL") {
        return alert("포인트 차감에 실패했습니다.");
      } else if (
        response.data == "Insufficient available points for deduction"
      ) {
        return alert("차감할 포인트가 잔여 포인트보다 많습니다.");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const downloadMissionExcel = async () => {
    try {
      const response = await api.get("/point/pointHistoryExcelDownload", {
        params: {
          agencyName: constName,
          status: statusFilter !== "All" ? statusFilter : undefined,
        },
        responseType: "blob",
      });

      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "point_history_list.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading Excel file:", error);
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
            {userType === "ADMIN" && (
              <button
                type="button"
                className="saveButton"
                onClick={handleClickOpenDeduct}
              >
                포인트 차감
              </button>
            )}
            {userType === "ADMIN" && (
              <button
                type="button"
                className="downloadButton"
                onClick={downloadMissionExcel}
              >
                엑셀 다운로드
              </button>
            )}
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.pointHistoryNo}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          checkboxSelection
          autoHeight
          isRowSelectable={(params) => params.row.status === "충전요청"}
          onRowSelectionModelChange={(newSelection) => {
            const selectedIds = new Set(newSelection);
            const selectedRows = rows.filter((row) =>
              selectedIds.has(row.pointHistoryNo)
            );
            setSelectedRows(selectedRows);
          }}
        />
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

      {/* 포인트 차감 Dialog */}
      <Dialog open={openDeduct} onClose={handleCloseDeduct}>
        <DialogTitle>포인트 차감</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="대행사명"
            type="text"
            fullWidth
            variant="outlined"
            value={deducationAgnecyeName}
            onChange={(e) => setDeducationAgnecyeName(e.target.value)}
          />
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
            label="차감 사유"
            type="text"
            fullWidth
            variant="outlined"
            value={deductReason}
            onChange={(e) => setDeductReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className="addButton" onClick={pointDeduction}>
            차감
          </button>
          <button className="addButton" onClick={handleCloseDeduct}>
            취소
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PointManage;
