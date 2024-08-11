import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertAgencyInfo } from "../store/agency/agencySlice";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import "../../css/Agency.css";

const AddAgency = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [manager, setManager] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [placeTraffic, setPlaceTraffic] = useState("");
  const [placeSave, setPlaceSave] = useState("");
  const [placeSavePremium, setPlaceSavePremium] = useState("");
  const [resaleYn, setResaleYn] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API 호출을 Redux Thunk로 디스패치
      const resultAction = await dispatch(
        insertAgencyInfo({
          loginId,
          password,
          agencyName,
          manager,
          phoneNum,
          placeTraffic,
          placeSave,
          placeSavePremium,
          resaleYn,
        })
      );

      if (insertAgencyInfo.fulfilled.match(resultAction)) {
        console.log("Agency info added:", resultAction.payload);
      } else {
        console.error("Failed to add agency info:", resultAction.payload);
      }
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="mainContainerDiv">
      <div className="addAgencyDiv">
        <h2 className="menuTitle">대행사 추가</h2>
        <form onSubmit={handleSubmit}>
          <b>로그인 아이디</b>
          <TextField
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            fullWidth
            required
          />

          <b>비밀번호</b>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            type="password"
          />

          <b>대행사명</b>
          <TextField
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            fullWidth
            required
          />

          <b>담당자</b>
          <TextField
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            fullWidth
            required
          />

          <b>연락처</b>
          <TextField
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            fullWidth
            required
          />

          <b>플레이스 트래픽</b>
          <TextField
            value={placeTraffic}
            onChange={(e) => setPlaceTraffic(e.target.value)}
            fullWidth
          />

          <b>플레이스 저장</b>
          <TextField
            value={placeSave}
            onChange={(e) => setPlaceSave(e.target.value)}
            fullWidth
          />

          <b>플레이스 저장 프리미엄</b>
          <TextField
            value={placeSavePremium}
            onChange={(e) => setPlaceSavePremium(e.target.value)}
            fullWidth
          />

          <b>재판매 여부</b>
          <FormControl fullWidth>
            <Select
              value={resaleYn}
              onChange={(e) => setResaleYn(e.target.value)}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            추가하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddAgency;
