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

const AddAgency = () => {
    const [agency, setAgency]   = useState("");
    const [contact, setContact] = useState("");
    const [manager, setManager] = useState("");
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");


    return (
        <div className="mainContainerDiv">
            <div className="missionManageDiv">
                <h2 className="menuTitle">대행사 추가</h2>

                <div>

                    <b>대행사</b>
                    <TextField
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        fullWidth
                    />

                    <b>연락처</b>
                    <TextField
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />

                    <b>담당자</b>
                    <TextField
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                    />

                    <b>아이디</b>
                    <TextField
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />

                    <b>비밀번호</b>
                    <TextField
                        value={loginPw}
                        onChange={(e) => setLoginPw(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAgency;