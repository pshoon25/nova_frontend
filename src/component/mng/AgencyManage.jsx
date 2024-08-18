import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../api/api.js";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AgencyManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState({});

  // 데이터 가져오기
  useEffect(() => {
    getAgencyList();
  }, []);

  const getAgencyList = async () => {
    try {
      const response = await api.get("/agency/getAgencyList");
      const data = response.data;

      // API 응답에 맞게 데이터 변환
      const formattedData = data.map((agency) => ({
        id: agency.agencyCode,
        agencyCode: agency.agencyCode || "N/A",
        loginId: agency.loginId || "N/A",
        password: agency.password || "N/A",
        agencyName: agency.agencyName || "N/A",
        name: agency.name || "N/A",
        phoneNum: agency.phoneNum || "N/A",
        placeTraffic: agency.placeTraffic ? `${agency.placeTraffic}` : "N/A",
        placeSave: agency.placeSave ? `${agency.placeSave}` : "N/A",
        placeSavePremium: agency.placeSavePremium
          ? `${agency.placeSavePremium}`
          : "N/A",
        resaleYn: agency.resaleYn || "N/A",
        userType: agency.userType || "N/A",
        useYn: agency.useYn || "N/A",
        registerDateTime: agency.registerDateTime
          ? agency.registerDateTime.toString()
          : "N/A",
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

  // 드롭다운 렌더링 함수
  const renderDropdownEditCell = (params) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{params.field}</InputLabel>
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
    { field: "loginId", headerName: "로그인 아이디", width: 170 },
    { field: "agencyName", headerName: "대행사명", width: 170, editable: true },
    { field: "name", headerName: "담당자", width: 150, editable: true },
    { field: "phoneNum", headerName: "연락처", width: 150, editable: true },
    {
      field: "placeTraffic",
      headerName: "플레이스 트래픽",
      width: 130,
      editable: true,
    },
    {
      field: "placeSave",
      headerName: "플레이스 저장",
      width: 130,
      editable: true,
    },
    {
      field: "placeSavePremium",
      headerName: "플레이스 저장 프리미엄",
      width: 130,
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
    <div className="mainContainerDiv" style={{ height: 600, width: "100%" }}>
      <div className="missionManageDiv">
        <h2 className="menuTitle">대행사 관리</h2>

        <div className="actionBtns">
          <button type="button" onClick={addAgency}>
            New
          </button>
          <button type="button" onClick={agencySave}>
            Save
          </button>
          <button type="button">Excel</button>
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
          style={{ height: 600 }} // DataGrid의 높이 설정
        />
      </div>
    </div>
  );
};

export default AgencyManage;
