import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

function Announcement2({ visible, onClose }) {
  const [showPopup, setShowPopup] = useState(visible);

  useEffect(() => {
    const visitedBeforeDate = localStorage.getItem("VisitCookie2");
    const todayDate = new Date().toLocaleDateString(); // 오늘 날짜를 문자열로 변환

    if (visitedBeforeDate === todayDate) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleDayClose = () => {
    const todayDate = new Date().toLocaleDateString();
    localStorage.setItem("VisitCookie2", todayDate); // 오늘 날짜를 저장
    setShowPopup(false);
    onClose(); // 팝업을 닫음
  };

  const handleClose = () => {
    setShowPopup(false);
    onClose();
  };

  return ReactDOM.createPortal(
    showPopup && (
      <>
        <ModalOverlay />
        <ModalWrapper>
          <ModalInner>
            <Title>[추석 공지]</Title>
            <Content>
              <ul>
                <li>
                  NOVA: 9월 13~18일 구동을 원하시면 9월 13일 모두 신청해 주셔야
                  합니다.
                </li>
                <li>
                  오락: 9월 13~19일 구동을 원하시면 9월 12일 모두 신청해 주셔야
                  합니다.
                </li>
              </ul>
            </Content>
            <ButtonContainer>
              <CloseButton onClick={handleDayClose}>
                오늘 하루 보지 않기
              </CloseButton>
              <CloseButton onClick={handleClose}>닫기</CloseButton>
            </ButtonContainer>
          </ModalInner>
        </ModalWrapper>
      </>
    ),
    document.getElementById("modal-root")
  );
}

Announcement2.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  position: relative;
  width: 400px;
  max-width: 90%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
`;

const Content = styled.div`
  margin-bottom: 20px;
  ul {
    padding-left: 20px;
    list-style-type: disc;
    li {
      margin-bottom: 8px;
      font-size: 16px;
      color: #555;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background: #ffffff;
  border: none;
  border-radius: 12px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1),
    -6px -6px 12px rgba(255, 255, 255, 0.7);
  color: #000;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export default Announcement2;
