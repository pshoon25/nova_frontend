import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../../css/MissionManage.css";

const AddMission = () => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mid, setMid] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [dailyWork, setDailyWork] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDailyWorkChange = (event) => {
    setDailyWork(event.target.value);
  };

  const handlePlaceNameFetch = () => {
    // Implement the logic to fetch place name based on MID
  };

  return (
    <div>
      <div className="missionMngStatusDiv">
        <table>
          <thead>
            <tr>
              <th>현재 포인트</th>
              <th>플레이스 킵</th>
              <th>플레이스 저장</th>
              <th>플레이스 트래픽</th>
              <th>플레이스 검색저장</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>857,250P</td>
              <td>35P</td>
              <td>35P</td>
              <td>25P</td>
              <td>45P</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="addMissionDiv">
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel id="type-label">종류</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              label="종류"
              onChange={handleTypeChange}
            >
              <MenuItem value="type1">플레이스 킵</MenuItem>
              <MenuItem value="type2">플레이스 저장</MenuItem>
              <MenuItem value="type3">플레이스 트래픽</MenuItem>
              <MenuItem value="type4">플레이스 검색저장</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="시작일"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="종료일"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              label="MID"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handlePlaceNameFetch}>
              플레이스명 가져오기
            </Button>
          </Box>
          <TextField
            label="플레이스명"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            fullWidth
          />
          <TextField
            label="키워드"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="daily-work-label">일작업량</InputLabel>
            <Select
              labelId="daily-work-label"
              id="daily-work"
              value={dailyWork}
              label="일작업량"
              onChange={handleDailyWorkChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" fullWidth>
            추가
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddMission;
