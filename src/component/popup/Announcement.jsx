import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

function Announcement({ visible, onClose }) {
  const [showPopup, setShowPopup] = useState(visible);

  useEffect(() => {
    const visitedBeforeDate = localStorage.getItem("VisitCookie");
    const todayDate = new Date().toLocaleDateString(); // 오늘 날짜를 문자열로 변환

    if (visitedBeforeDate === todayDate) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleDayClose = () => {
    const todayDate = new Date().toLocaleDateString();
    localStorage.setItem("VisitCookie", todayDate); // 오늘 날짜를 저장
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
            <Title>NOVA</Title>
            <Content>
              <ul>
                <li>트래픽, 저장</li>
                <li>1일 50작업 이상 (51건, 52건 식으로 가능)</li>
                <li>익일 구동</li>
                <li>환불 요청 시 당일 차감 환불</li>
                <li>세금계산서 발행 가능</li>
              </ul>
            </Content>
            <Title>오락</Title>
            <Content>
              <ul>
                <li>트래픽: 1일 200작업 이상</li>
                <li>12시 이전 신청 건 익일 구동 마감</li>
                <li>구동 기간 중 환불 불가</li>
                <li>세금계산서 발행 가능</li>
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

Announcement.propTypes = {
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
  background: #ffffff; /* 배경 색상 없음 (뉴모피즘 스타일) */
  border: none; /* 기본 테두리 제거 */
  border-radius: 12px; /* 모서리 둥글기 */
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1),
    -6px -6px 12px rgba(255, 255, 255, 0.7); /* 뉴모피즘 음영 효과 */
  color: #000; /* 글씨 색상 검은색으로 변경 */
  padding: 10px 20px; /* 안쪽 여백 */
  font-size: 16px; /* 폰트 크기 */
  cursor: pointer; /* 포인터 커서 */
  transition: all 0.2s ease; /* 부드러운 전환 효과 */
`;

export default Announcement;
