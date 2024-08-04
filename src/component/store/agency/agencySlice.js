import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api"; // API 함수가 정의된 경로

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

export const insertAgencyInfo = createAsyncThunk(
  "/agency/insertAgencyInfo",
  async (agencyInfo, thunkAPI) => {
    try {
      const response = await api(
        "POST",
        "/agency/insertAgencyInfo",
        agencyInfo
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      });
  },
});

export default agencySlice.reducer;
