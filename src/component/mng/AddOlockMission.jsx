import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../../css/MissionManage.css";
import { api } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

const AddOlockMission = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [adStartDate, setAdStartDate] = useState(null);
  const [adEndDate, setAdEndDate] = useState(null);
  const [mid, setMid] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");
  const [mainSearchKeywords, setMainSearchKeywords] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [dailyWorkload, setDailyWorkload] = useState("");
  const location = useLocation();
  const pointsData = location.state?.pointsData || {
    availablePoints: 0,
    olockPlaceSearch: 0,
    olockPlaceSearchSave: 0,
  };

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const agencyCode = loginInfo ? loginInfo.agencyCode : null;

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDailyWorkloadChange = (e) => {
    const value = e.target.value;
    // 숫자 또는 빈 문자열만 허용
    if (/^\d*$/.test(value)) {
      setDailyWorkload(value);
    }
  };

  const addMission = async () => {
    const formatDate = (date) => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const missionData = {
      agencyCode,
      reward: "OLOCK",
      itemName,
      adStartDate: formatDate(adStartDate), // 수정된 부분
      adEndDate: formatDate(adEndDate), // 수정된 부분
      mid,
      placeName: placeName,
      placeUrl: placeUrl,
      mainSearchKeywords,
      correctAnswer, // 수정된 부분
      dailyWorkload: dailyWorkload ? parseInt(dailyWorkload, 10) : 0, // 숫자로 변환
    };

    try {
      const response = await api.post("/mission/addMissions", missionData);

      const data = response.data;

      if (data === "SUCCESS") {
        // 성공 메시지 표시
        alert("등록에 성공하였습니다.");
        // 페이지 이동
        navigate("/main/olockMission");
      } else if (data === "NO POINTS") {
        alert("보유 포인트가 부족합니다.");
      } else {
        alert("등록에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="mainContainerDiv">
      <div className="addMissionDiv">
        <h2 className="menuTitle">미션 추가</h2>
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
        <div className="addInputDiv">
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl fullWidth>
              <InputLabel id="itemName">종류</InputLabel>
              <Select
                labelId="type-itemName"
                id="itemName"
                value={itemName}
                label="종류"
                onChange={handleItemNameChange}
              >
                <MenuItem value="PLACE_SEARCH">플레이스 검색</MenuItem>
                <MenuItem value="PLACE_SEARCH_SAVE">
                  플레이스 검색 + 저장
                </MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="시작일"
                  value={adStartDate}
                  onChange={(newValue) => {
                    setAdStartDate(newValue);
                    if (newValue && adEndDate && newValue > adEndDate) {
                      setAdEndDate(null);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  disablePast
                  minDate={new Date().setDate(new Date().getDate() + 1)} // 오늘 날짜를 제외한 최소 날짜
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="종료일"
                  value={adEndDate}
                  onChange={(newValue) => {
                    setAdEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={adStartDate || new Date()}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              label="MID"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              fullWidth
            />
            <TextField
              label="플레이스명"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              fullWidth
            />
            <TextField
              label="플레이스 주소"
              value={placeUrl}
              onChange={(e) => setPlaceUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="검색 키워드"
              value={mainSearchKeywords}
              onChange={(e) => setMainSearchKeywords(e.target.value)}
              fullWidth
            />
            <TextField
              label="주변- 명소 1번째 정답은?"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              fullWidth
            />

            <TextField
              label="1일 작업량"
              value={dailyWorkload}
              onChange={handleDailyWorkloadChange}
              fullWidth
              type="number"
              inputProps={{ min: "0", step: "1" }} // 음수 및 비정수 방지
            />
            <button className="addButton" type="button" onClick={addMission}>
              추가
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AddOlockMission;
