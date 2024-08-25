import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAgencyInfo } from "../store/agency/agencySlice";
import { Select, MenuItem, TextField, FormControl } from "@mui/material";
import "../../css/Agency.css";
import { api } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

const AddAgency = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [name, setname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [resaleYn, setResaleYn] = useState("Y"); // 기본값을 "Y"로 설정
  const [loginIdError, setLoginIdError] = useState(""); // 로그인 ID 오류 메시지 상태

  // Nova states with default values set to 0
  const [novaPlaceSearch, setNovaPlaceSearch] = useState(0);
  const [novaPlaceSearchSave, setNovaPlaceSearchSave] = useState(0);
  const [novaPlaceSearchSavePremium, setNovaPlaceSearchSavePremium] =
    useState(0);
  const [novaPlaceKeep, setNovaPlaceKeep] = useState(0);
  const [novaSmartStoreSearch, setNovaSmartStoreSearch] = useState(0);

  // Olock states with default values set to 0
  const [olockPlaceSearch, setOlockPlaceSearch] = useState(0);
  const [olockPlaceSearchSave, setOlockPlaceSearchSave] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 ID 중복 체크 함수
    const checkLoginIdDuplicate = async () => {
      if (loginId) {
        try {
          const response = await api.get("/agency/checkLoginIdDuplicate", {
            params: {
              loginId: loginId,
            },
          });
          if (response.data === 1) {
            setLoginIdError("이미 사용중인 아이디입니다.");
          } else {
            setLoginIdError("");
          }
        } catch (error) {
          console.error("API 호출 중 오류가 발생했습니다:", error);
        }
      } else {
        setLoginIdError("");
      }
    };

    checkLoginIdDuplicate();
  }, [loginId]); // 로그인 ID가 변경될 때마다 호출

  const validateLoginId = (id) => {
    // 영어 대소문자와 숫자만 허용하는 정규 표현식
    const loginIdRegex = /^[a-zA-Z0-9]*$/;

    if (!id) {
      setLoginIdError("로그인 아이디는 필수 입력 항목입니다.");
      return false;
    } else if (id.length < 5 || id.length > 20) {
      setLoginIdError("로그인 아이디는 5자 이상 20자 이하로 입력해주세요.");
      return false;
    } else if (!loginIdRegex.test(id)) {
      setLoginIdError("로그인 아이디는 영어와 숫자만 포함할 수 있습니다.");
      return false;
    } else {
      setLoginIdError("");
      return true;
    }
  };

  // Handle input change and validation
  const handleLoginIdChange = (e) => {
    const value = e.target.value;
    // Allow only alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setLoginId(filteredValue);
    validateLoginId(filteredValue);
  };

  // Handle phone number change
  const handlePhoneNumChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    setPhoneNum(value.substring(0, 11)); // Limit to 11 digits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginIdError) {
      console.error("폼 유효성 검사 실패:", loginIdError);
      return; // 로그인 ID에 오류가 있으면 제출하지 않음
    }

    try {
      const resultAction = await dispatch(
        insertAgencyInfo({
          loginId,
          password,
          agencyName,
          name,
          phoneNum,
          resaleYn,
          items: {
            NOVA: {
              PLACE_SEARCH: novaPlaceSearch.toString(),
              PLACE_SEARCH_SAVE: novaPlaceSearchSave.toString(),
              PLACE_SEARCH_SAVE_PREMIUM: novaPlaceSearchSavePremium.toString(),
              PLACE_KEEP: novaPlaceKeep.toString(),
              SMARTSTORE_SEARCH: novaSmartStoreSearch.toString(),
            },
            OLOCK: {
              PLACE_SEARCH: olockPlaceSearch.toString(),
              PLACE_SEARCH_SAVE: olockPlaceSearchSave.toString(),
            },
          },
        })
      );

      if (insertAgencyInfo.fulfilled.match(resultAction)) {
        // 성공 메시지 표시
        alert("등록에 성공하였습니다.");
        // 페이지 이동
        navigate("/main/agencyManage");
      } else {
        alert("등록에 실패하였습니다. 다시 시도해주세요.");
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
            onChange={handleLoginIdChange}
            fullWidth
            required
            error={!!loginIdError}
            helperText={loginIdError}
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
            inputProps={{ maxLength: 20 }}
          />

          <b>담당자</b>
          <TextField
            value={name}
            onChange={(e) => setname(e.target.value.replace(/[0-9]/g, ""))}
            fullWidth
            required
            inputProps={{ maxLength: 20 }}
          />

          <b>연락처</b>
          <TextField
            value={phoneNum}
            onChange={handlePhoneNumChange}
            fullWidth
            required
            inputProps={{ maxLength: 11 }} // Limit to 11 characters
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

          <div className="itemPriceDiv">
            <div className="novaItemDiv itemDiv">
              <h3>Nova</h3>
              <b>플레이스 검색</b>
              <TextField
                type="number"
                value={novaPlaceSearch}
                onChange={(e) => setNovaPlaceSearch(Number(e.target.value))}
                fullWidth
              />

              <b>플레이스 검색 + 저장</b>
              <TextField
                type="number"
                value={novaPlaceSearchSave}
                onChange={(e) => setNovaPlaceSearchSave(Number(e.target.value))}
                fullWidth
              />

              <b>플레이스 검색 + 저장(프리미엄)</b>
              <TextField
                type="number"
                value={novaPlaceSearchSavePremium}
                onChange={(e) =>
                  setNovaPlaceSearchSavePremium(Number(e.target.value))
                }
                fullWidth
              />

              <b>플레이스 KEEP</b>
              <TextField
                type="number"
                value={novaPlaceKeep}
                onChange={(e) => setNovaPlaceKeep(Number(e.target.value))}
                fullWidth
              />

              <b>스마트스토어 검색</b>
              <TextField
                type="number"
                value={novaSmartStoreSearch}
                onChange={(e) =>
                  setNovaSmartStoreSearch(Number(e.target.value))
                }
                fullWidth
              />
            </div>
            <div className="olockItemDiv itemDiv">
              <h3>Olock</h3>
              <b>플레이스 검색</b>
              <TextField
                type="number"
                value={olockPlaceSearch}
                onChange={(e) => setOlockPlaceSearch(Number(e.target.value))}
                fullWidth
              />
              <b>플레이스 검색+저장</b>
              <TextField
                type="number"
                value={olockPlaceSearchSave}
                onChange={(e) =>
                  setOlockPlaceSearchSave(Number(e.target.value))
                }
                fullWidth
              />
            </div>
          </div>
          <div className="addAgencyBtnDiv">
            <button
              type="submit"
              className="saveButton"
              disabled={!!loginIdError}
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgency;
