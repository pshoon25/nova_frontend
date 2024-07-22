import { DataGrid } from "@mui/x-data-grid";

const PointManage = () => {
  // 샘플 데이터
  const rows = [
    {
      id: 1,
      missionNumber: "4896",
      type: "우아한카운터",
      points: "315,000",
      detail: "구글플레이스토어 (등록)",
      date: "2024-07-15 16:54:15",
      bug: "차감",
    },
    {
      id: 2,
      missionNumber: "-",
      type: "",
      points: "200,000",
      detail: "포인트 송신",
      date: "2024-07-15 15:25:05",
      bug: "송신",
    },
    {
      id: 3,
      missionNumber: "4873",
      type: "밸류블비즈니스",
      points: "30,000",
      detail: "네이버 메일인증 (등록)",
      date: "2024-07-15 11:36:21",
      bug: "차감",
    },
    // Add more rows as needed
  ];

  // 컬럼 정의
  const columns = [
    { field: "missionNumber", headerName: "미션번호", width: 100 },
    { field: "type", headerName: "타입", width: 200 },
    { field: "points", headerName: "포인트", width: 100 },
    { field: "detail", headerName: "내역", width: 250 },
    { field: "date", headerName: "사용일", width: 200 },
    { field: "bug", headerName: "버그", width: 100 },
  ];

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default PointManage;
