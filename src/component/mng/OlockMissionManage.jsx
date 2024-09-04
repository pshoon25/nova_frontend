import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import "../../css/MissionManage.css";
import { api } from "../../api/api.js";
import { TextField, Select, MenuItem } from "@mui/material";
import * as XLSX from "xlsx";

const OlockMissionManage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("");
  const [rows, setRows] = useState([]);
  const [agencyName, setaAencyName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [pointsData, setPointsData] = useState({
    availablePoints: 0,
    olockPlaceSearch: 0,
    olockPlaceSearchSave: 0,
  });
  const [changedRows, setChangedRows] = useState({});

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;
  const userType = loginInfo ? loginInfo.userType : null;

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  const addMission = () => {
    navigate("/main/addolockMission", { state: { pointsData } });
  };

  const getAgencyMissionList = () => {
    if (userType === "ADMIN") {
      getAgencyMissionListByAgencyName();
    } else if (userType === "AGENCY") {
      getAgencyMissionListByAgencyCode();
    }
  };

  const getAgencyMissionListByAgencyName = async () => {
    try {
      const response = await api.get(
        "/mission/getAgencyMissionListByAgencyName",
        {
          params: {
            agencyName: agencyName,
            reward: "OLOCK",
            itemName: activeType,
          },
        }
      );
      const data = response.data;

      const formattedData = data.map((el, index) => {
        return {
          id: index + 1,
          missionNo: el.missionNo || "",
          reward: el.reward || "",
          agencyName: el.agencyName || "",
          itemName:
            el.itemName === "PLACE_SEARCH"
              ? "플레이스 검색"
              : el.itemName === "PLACE_SEARCH_SAVE"
              ? "플레이스 검색 + 저장"
              : "",
          type: el.itemName.startsWith("PLACE")
            ? "PLACE"
            : el.itemName.startsWith("SMARTSTORE")
            ? "SMARTSTORE"
            : "",
          mid: el.mid || "",
          priceComparisonId: el.priceComparisonId || "",
          adStartDate: el.adStartDate || "",
          dailyWorkload: el.dailyWorkload || "",
          totalWorkdays: el.totalWorkdays || "",
          placeName: el.placeName || "",
          rankKeyword: el.rankKeyword || "",
          mainSearchKeyword: el.mainSearchKeyword || "",
          subSearchKeyword: el.subSearchKeyword || "",
          adEndDate: el.adEndDate || "",
          placeUrl: el.placeUrl || "",
          totalRequest: el.totalRequest || "",
          missionStatus: el.missionStatus || "",
        };
      });
      setRows(formattedData);
      // 대행사 포인트 조회
      getAgencyPointByAgencyName();
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const getAgencyMissionListByAgencyCode = async () => {
    try {
      const response = await api.get(
        "/mission/getAgencyMissionListByAgencyCode",
        {
          params: {
            agencyCode: agencyCode,
            placeName: placeName,
            reward: "OLOCK",
            itemName: activeType,
          },
        }
      );
      const data = response.data;

      const formattedData = data.map((el, index) => {
        return {
          id: index + 1,
          missionNo: el.missionNo || "",
          agencyName: el.agencyName || "",
          itemName:
            el.itemName === "PLACE_SEARCH"
              ? "플레이스 검색"
              : el.itemName === "PLACE_SEARCH_SAVE"
              ? "플레이스 검색 + 저장"
              : "",
          type: el.itemName.startsWith("PLACE")
            ? "PLACE"
            : el.itemName.startsWith("SMARTSTORE")
            ? "SMARTSTORE"
            : "",
          mid: el.mid || "",
          priceComparisonId: el.priceComparisonId || "",
          adStartDate: el.adStartDate || "",
          dailyWorkload: el.dailyWorkload || "",
          totalWorkdays: el.totalWorkdays || "",
          placeName: el.placeName || "",
          rankKeyword: el.rankKeyword || "",
          mainSearchKeyword: el.mainSearchKeyword || "",
          subSearchKeyword: el.subSearchKeyword || "",
          adEndDate: el.adEndDate || "",
          placeUrl: el.placeUrl || "",
          totalRequest: el.totalRequest || "",
          missionStatus:
            el.missionStatus === "WATING"
              ? "대기중"
              : el.missionStatus === "PROGRESS"
              ? "진행중"
              : el.missionStatus === "COMPLETED"
              ? "완료"
              : el.missionStatus === "CANCEL"
              ? "중단"
              : "",
        };
      });

      setRows(formattedData);
      // 대행사 포인트 조회
      getAgencyPointByAgencyCode();
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const getAgencyPoint = () => {
    if (userType === "ADMIN") {
      getAgencyPointByAgencyName();
    } else if (userType === "AGENCY") {
      getAgencyPointByAgencyCode();
    }
  };

  const getAgencyPointByAgencyName = async () => {
    try {
      const response = await api.get("/point/getAgencyPointByAgencyName", {
        params: { agencyName: agencyName },
      });

      const data = response.data;

      setPointsData({
        availablePoints: data.availablePoints || 0,
        olockPlaceSearch: data.olockPlaceSearch || 0,
        olockPlaceSearchSave: data.olockPlaceSearchSave || 0,
        olockPlaceSearchSavePremium: data.olockPlaceSearchSavePremium || 0,
        olockPlaceKeep: data.olockPlaceKeep || 0,
        olockSmartstoreSearch: data.olockSmartstoreSearch || 0,
      });
    } catch (error) {
      console.error("error:", error);
    }
  };

  const getAgencyPointByAgencyCode = async () => {
    try {
      const response = await api.get("/point/getAgencyPointByAgencyCode", {
        params: { agencyCode: agencyCode },
      });

      const data = response.data;

      setPointsData({
        availablePoints: data.availablePoints || 0,
        olockPlaceSearch: data.olockPlaceSearch || 0,
        olockPlaceSearchSave: data.olockPlaceSearchSave || 0,
        olockPlaceSearchSavePremium: data.olockPlaceSearchSavePremium || 0,
        olockPlaceKeep: data.olockPlaceKeep || 0,
        olockSmartstoreSearch: data.olockSmartstoreSearch || 0,
      });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const saveolockMissionStatus = async () => {
    const missionsToSave = Object.values(changedRows);

    try {
      const response = await api.post(
        "/mission/saveolockMissionStatus",
        missionsToSave
      );

      if (response.status === 200) {
        alert("미션 상태가 성공적으로 저장되었습니다.");
        getAgencyMissionList();
      } else {
        alert("미션 상태 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving mission info:", error);
      alert("미션 상태 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getAgencyMissionList();
    getAgencyPoint();
  }, []);

  useEffect(() => {
    getAgencyMissionList();
  }, [activeType]);

  const columns = [
    { field: "id", headerName: "No", width: 30 },
    ...(userType === "ADMIN"
      ? [{ field: "agencyName", headerName: "대행사", width: 50 }]
      : []),
    { field: "missionNo", headerName: "미션번호", width: 150 },
    { field: "itemName", headerName: "종류", width: 200 },
    { field: "type", headerName: "유형", width: 100 },
    { field: "mid", headerName: "mid", width: 100 },
    { field: "priceComparisonId", headerName: "가격비교 ID", width: 100 },
    { field: "adStartDate", headerName: "광고시작일", width: 100 },
    { field: "dailyWorkload", headerName: "1일작업량", width: 100 },
    { field: "totalWorkdays", headerName: "총작업일수", width: 100 },
    { field: "placeName", headerName: "플레이스명", width: 100 },
    { field: "rankKeyword", headerName: "순위키워드", width: 100 },
    { field: "mainSearchKeyword", headerName: "메인검색 키워드", width: 100 },
    {
      field: "subSearchKeyword",
      headerName: "3위이내검색 키워드",
      width: 100,
    },
    { field: "adEndDate", headerName: "광고종료일", width: 100 },
    { field: "placeUrl", headerName: "플레이스주소", width: 100 },
    { field: "totalRequest", headerName: "총요청량", width: 100 },
    ...(userType === "ADMIN"
      ? [
          {
            field: "missionStatus",
            headerName: "미션상태",
            width: 150,
            renderCell: (params) => (
              <Select
                value={params.value || ""}
                disabled={params.value === "CANCEL"} // Mission Status가 CANCEL이면 드롭다운 비활성화
                onChange={(e) => {
                  const newValue = e.target.value;
                  const id = params.row.id;
                  const newRows = [...rows];
                  newRows[id - 1] = {
                    ...newRows[id - 1],
                    missionStatus: newValue,
                  };
                  setRows(newRows);

                  setChangedRows((prevChangedRows) => ({
                    ...prevChangedRows,
                    [id]: {
                      missionNo: newRows[id - 1].missionNo,
                      missionStatus: newValue,
                    },
                  }));
                }}
              >
                <MenuItem value="WATING">대기</MenuItem>
                <MenuItem value="PROGRESS">진행중</MenuItem>
                <MenuItem value="COMPLETED">완료</MenuItem>
                <MenuItem value="CANCEL">취소</MenuItem>
              </Select>
            ),
          },
        ]
      : [{ field: "missionStatus", headerName: "상태", width: 150 }]),
    { field: "manage", headerName: "관리", width: 70 },
  ];

  const downloadMissionExcel = async () => {
    try {
      const response = await api.get("/mission/missionExcelDownload", {
        params: {
          agencyName: encodeURIComponent(agencyName),
          reward: encodeURIComponent("OLOCK"),
          itemName: encodeURIComponent(activeType),
        },
        responseType: "blob",
      });

      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mission_list.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <div className="mainContainerDiv">
      <div className="missionManageDiv">
        <h2 className="menuTitle">오락 미션 관리</h2>
        <div className="missionMngStatusDiv">
          <table>
            <thead>
              <tr>
                <th>현재 포인트</th>
                <th>플레이스 검색</th>
                <th>플레이스 검색 + 저장</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pointsData.availablePoints}P</td>
                <td>{pointsData.olockPlaceSearch}P</td>
                <td>{pointsData.olockPlaceSearchSave}P</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="actionBtns">
          <div className="searchDiv">
            <div>
              {userType === "ADMIN" && (
                <TextField
                  className="textField"
                  label="대행사명"
                  variant="outlined"
                  size="small"
                  value={agencyName}
                  onChange={(e) => setaAencyName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && getAgencyMissionList()}
                />
              )}
              {userType === "AGENCY" && (
                <TextField
                  className="textField"
                  label="플레이스명"
                  variant="outlined"
                  size="small"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && getAgencyMissionList()}
                />
              )}
              <button className="searchButton" onClick={getAgencyMissionList}>
                검색
              </button>
            </div>
            <div className="typeButtons">
              <b>타입</b>
              <button
                className={`typeButton ${activeType === "" ? "active" : ""}`}
                onClick={() => handleTypeClick("")}
              >
                전체
              </button>
              <button
                className={`typeButton ${
                  activeType === "PLACE_SEARCH" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("PLACE_SEARCH")}
              >
                플레이스 검색
              </button>
              <button
                className={`typeButton ${
                  activeType === "PLACE_SEARCH_SAVE" ? "active" : ""
                }`}
                onClick={() => handleTypeClick("PLACE_SEARCH_SAVE")}
              >
                플레이스 검색 + 저장
              </button>
            </div>
          </div>

          <div className="actionBtns">
            {userType === "AGENCY" && (
              <button type="button" className="addButton" onClick={addMission}>
                미션 추가
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
            {userType === "ADMIN" && (
              <button
                type="button"
                className="saveButton"
                onClick={saveolockMissionStatus}
              >
                저장
              </button>
            )}
          </div>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          autoHeight
        />
      </div>
    </div>
  );
};

export default OlockMissionManage;
