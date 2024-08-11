import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api"; // API 함수가 정의된 경로

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const insertAgencyInfo = createAsyncThunk(
  "/agency/insertAgencyInfo",
  async (agencyInfo, thunkAPI) => {
    try {
      const response = await api.post("/agency/insertAgencyInfo", agencyInfo);
      return response.data; // response 객체에 data 속성이 있는지 확인
    } catch (error) {
      // 응답에 data가 없을 경우, 전체 에러 객체를 반환하거나 다른 에러 메시지를 반환
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
    }
  }
);

export const getAgencyList = createAsyncThunk(
  "/agency/getAgencyList",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/agency/getAgencyList");
      return response.data; // response 객체에 data 속성이 있는지 확인
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
    }
  }
);

const agencySlice = createSlice({
  name: "agency",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(insertAgencyInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(insertAgencyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(insertAgencyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getAgencyList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAgencyList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAgencyList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default agencySlice.reducer;
