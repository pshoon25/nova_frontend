import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { DataGrid } from "@mui/x-data-grid";


const AgencyManage = () => {
    const navigate = useNavigate();

    // 샘플 데이터
  const rows = [
    {
      id: 1,
      currentPoints: "867,250P",
      rewardType: "35P",
      placeSave: "25P",
      placeTraffic: "35P",
      placeSearchSave: "45P",
    },
    {
      id: 2,
      currentPoints: "100,000P",
      rewardType: "50P",
      placeSave: "30P",
      placeTraffic: "40P",
      placeSearchSave: "60P",
    },
    {
      id: 3,
      currentPoints: "200,000P",
      rewardType: "25P",
      placeSave: "20P",
      placeTraffic: "30P",
      placeSearchSave: "40P",
    },
  ];

  // 컬럼 정의
  const columns = [
    { field: "currentPoints", headerName: "현재 포인트", width: 150 },
    { field: "rewardType", headerName: "리워드 종류", width: 150 },
    { field: "placeSave", headerName: "플레이스 저장", width: 150 },
    { field: "placeTraffic", headerName: "플레이스 트래픽", width: 150 },
    { field: "placeSearchSave", headerName: "플레이스 검색저장", width: 150 },
  ];

    
    const addAgency = () => {
        navigate("/main/addAgency");
    }

    return (
        <div className="mainContainerDiv">
            <div className="missionManageDiv">
                <h2 className="menuTitle">대행사 관리</h2>

                

                <div>
                    <button type="button" onClick={addAgency}>대행사 추가</button>
                </div>

                <DataGrid
                    rows        ={rows}
                    columns     ={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    />
            </div>
        </div>
    )
}

export default AgencyManage;