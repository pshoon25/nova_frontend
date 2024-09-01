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

const AgencyManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [constName, setConstName] = useState("");
  const [resaleFilter, setResaleFilter] = useState("All");
  const [useFilter, setUseFilter] = useState("All");
  const [updatedRows, setUpdatedRows] = useState({});

  // 데이터 가져오기
  useEffect(() => {
    getAgencyList();
  }, []);

  const getAgencyList = async () => {
    try {
      const params = {
        agencyName: constName,
        resaleYn: resaleFilter !== "All" ? resaleFilter : undefined,
        useYn: useFilter !== "All" ? useFilter : undefined,
      };

      const response = await api.get("/agency/getAgencyList", { params });
      const data = response.data;

      const formattedData = data.map((agency) => ({
        id: agency.agencyCode,
        agencyCode: agency.agencyCode || "",
        loginId: agency.loginId || "",
        password: agency.password || "",
        agencyName: agency.agencyName || "",
        name: agency.name || "",
        phoneNum: agency.phoneNum || "",
        novaPlaceSearch: agency.novaPlaceSearch || 0,
        novaPlaceSearchSave: agency.novaPlaceSearchSave || 0,
        novaPlaceSearchSavePremium: agency.novaPlaceSearchSavePremium || 0,
        novaPlaceKeep: agency.novaPlaceKeep || 0,
        novaSmartstoreSearch: agency.novaSmartstoreSearch || 0,
        olockPlaceSearch: agency.olockPlaceSearch || 0,
        olockPlaceSearchSave: agency.olockPlaceSearchSave || 0,
        resaleYn: agency.resaleYn || "N/A",
        userType: agency.userType || "N/A",
        useYn: agency.useYn || "N/A",
        registerDateTime: agency.registerDateTime
          ? agency.registerDateTime.toString()
          : "",
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addAgency = () => {
    navigate("/main/addAgency");
  };

  const processRowUpdate = (newRow, oldRow) => {
    setUpdatedRows((prev) => ({
      ...prev,
      [newRow.id]: { ...oldRow, ...newRow },
    }));
    return newRow;
  };

  const agencySave = async () => {
    const updatedCount = Object.keys(updatedRows).length;

    if (updatedCount > 0) {
      const confirmation = window.confirm(
        `수정된 ${updatedCount}개의 항목이 있습니다. 저장하시겠습니까?`
      );

      if (confirmation) {
        await agencySaveApi(Object.values(updatedRows));
        setUpdatedRows({});
      }
    } else {
      alert("수정된 항목이 없습니다.");
    }
  };

  const agencySaveApi = async (updatedData) => {
    try {
      await api.put("/agency/updateAgencyInfo", updatedData);
      alert("저장되었습니다.");
      getAgencyList();
    } catch (error) {
      console.error("Error:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const renderDropdownEditCell = (params) => {
    return (
      <FormControl fullWidth>
        <Select
          value={params.value}
          onChange={(event) =>
            params.api.setEditCellValue({
              ...params,
              value: event.target.value,
            })
          }
          autoWidth
        >
          <MenuItem value="Y">Y</MenuItem>
          <MenuItem value="N">N</MenuItem>
        </Select>
      </FormControl>
    );
  };

  // 컬럼 정의
  const columns = [
    { field: "loginId", headerName: "로그인 아이디", width: 120 },
    { field: "agencyName", headerName: "대행사명", width: 120, editable: true },
    { field: "name", headerName: "담당자", width: 100, editable: true },
    { field: "phoneNum", headerName: "연락처", width: 120, editable: true },
    {
      field: "novaPlaceSearch",
      headerName: "노바 플레이스 검색",
      width: 150,
      editable: true,
    },
    {
      field: "novaPlaceSearchSave",
      headerName: "노바 플레이스 저장",
      width: 150,
      editable: true,
    },
    {
      field: "novaPlaceSearchSavePremium",
      headerName: "노바 플레이스 저장 프리미엄",
      width: 150,
      editable: true,
    },
    {
      field: "novaPlaceKeep",
      headerName: "노바 킵 플레이스",
      width: 150,
      editable: true,
    },
    {
      field: "novaSmartstoreSearch",
      headerName: "노바 스마트스토어 검색",
      width: 150,
      editable: true,
    },
    {
      field: "olockPlaceSearch",
      headerName: "오락 플레이스 검색",
      width: 150,
      editable: true,
    },
    {
      field: "olockPlaceSearchSave",
      headerName: "오락 플레이스 저장",
      width: 150,
      editable: true,
    },
    {
      field: "resaleYn",
      headerName: "재판매 여부",
      width: 100,
      editable: true,
      renderEditCell: renderDropdownEditCell, // 드롭다운 렌더링 함수 지정
    },
    {
      field: "useYn",
      headerName: "사용 여부",
      width: 100,
      editable: true,
      renderEditCell: renderDropdownEditCell, // 드롭다운 렌더링 함수 지정
    },
  ];

  const getRowClassName = (params) => {
    return updatedRows[params.id] ? "updated-row" : "";
  };

  return (
    <div className="mainContainerDiv">
      <div className="missionManageDiv">
        <h2 className="menuTitle">대행사 관리</h2>

        <div className="actionBtns">
          <div className="searchDiv">
            <TextField
              className="textField"
              label="대행사명"
              variant="outlined"
              size="small"
              value={constName}
              onChange={(e) => setConstName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getAgencyList()}
            />
            <FormControl
              className="formControl"
              variant="outlined"
              size="small"
            >
              <InputLabel>재판매 여부</InputLabel>
              <Select
                value={resaleFilter}
                onChange={(e) => setResaleFilter(e.target.value)}
                label="재판매 여부"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Y">Y</MenuItem>
                <MenuItem value="N">N</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className="formControl"
              variant="outlined"
              size="small"
            >
              <InputLabel>사용 여부</InputLabel>
              <Select
                value={useFilter}
                onChange={(e) => setUseFilter(e.target.value)}
                label="사용 여부"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Y">Y</MenuItem>
                <MenuItem value="N">N</MenuItem>
              </Select>
            </FormControl>
            <button className="searchButton" onClick={getAgencyList}>
              검색
            </button>
          </div>
          <div className="btnsDiv">
            <button className="addButton" onClick={addAgency}>
              대행사 추가
            </button>
            <button className="saveButton" onClick={agencySave}>
              저장
            </button>
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={processRowUpdate}
          getRowClassName={getRowClassName} // 행 클래스 이름 설정
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          className="dataGrid" // DataGrid의 클래스 이름 설정
          autoHeight
        />
      </div>
    </div>
  );
};

export default AgencyManage;
