import "../../css/HomeHeader.css";

function HomeHeader(props) {
  return (
    <div class="homeHeader">
      <nav class="homeHeaderNav">
        <div class="headerLogoDiv">오름미디어</div>
        <div class="headerMenuDiv">
          <div>미션관리</div>
          <div>포인트관리</div>
          <div>대행사관리</div>
        </div>
        123
        <div class="headerUserDiv">
          <div>홍길동</div>
          로그아웃
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
