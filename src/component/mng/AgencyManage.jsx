import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const AgencyManage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    getAgencyList();
  }, []);

  const getAgencyList = async () => {
    setStatus("loading");
    try {
      const response = await axios.get(
        "/agency/getAgencyList"
      );
      const data = response.data;

      // API 응답에 맞게 데이터 변환
      const formattedData = data.map((agency) => ({
        id: agency.agencyCode,
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
      setStatus("succeeded");
    } catch (error) {
      console.error("Error fetching agency data:", error);
      setError(error.message);
      setStatus("failed");
    }
  };

  const addAgency = () => {
    navigate("/main/addAgency");
  };

  // 컬럼 정의
  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    { field: "loginId", headerName: "로그인 아이디", width: 150 },
    // { field: "password", headerName: "패스워드", width: 150 },
    { field: "agencyName", headerName: "대행사명", width: 150 },
    { field: "name", headerName: "담당자", width: 150 },
    { field: "phoneNum", headerName: "연락처", width: 150 },
    { field: "placeTraffic", headerName: "플레이스 트래픽", width: 150 },
    { field: "placeSave", headerName: "플레이스 저장", width: 150 },
    {
      field: "placeSavePremium",
      headerName: "플레이스 저장 프리미엄",
      width: 200,
    },
    { field: "resaleYn", headerName: "재판매 여부", width: 150 },
    // { field: "userType", headerName: "사용자 여부", width: 150 },
    // { field: "useYn", headerName: "사용 여부", width: 150 },
    // { field: "registerDateTime", headerName: "등록일자", width: 150 },
  ];

  return (
    <div className="mainContainerDiv" style={{ height: 600, width: "100%" }}>
      <div className="missionManageDiv">
        <h2 className="menuTitle">대행사 관리</h2>

        <div>
          <button type="button" onClick={addAgency}>
            대행사 추가
          </button>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
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
