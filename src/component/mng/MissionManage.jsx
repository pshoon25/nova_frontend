import styles from '../../css/Common.css';

const MissionManage = () => {

    return (    
        <div class="mainContainerDiv">
            <div class="mainDiv">
            <h2>미션관리</h2>
            <div>
                검색 메뉴
                <div>
                    <b>검색어</b>
                    <select>
                        <option>상품명</option>
                        <option>옵션</option>
                        <option>mid</option>
                    </select>
                    <input type="text"></input>
                    <button>검색</button>
                </div>
                <div>
                    <b>타입</b>
                    <a>전체</a>
                    <a>플레이스킵</a>
                    <a>플레이스저장</a>
                    <a>플레이스트래픽</a>
                    <a>플레이스검색저장</a>
                </div>
            </div>
            <div>
                상태 메뉴
            </div>
            <div>
                Grid
            </div>
            <div>
                <button>
                    추가
                </button>
            </div>
            </div>
        </div>
    ) 
}

export default MissionManage;