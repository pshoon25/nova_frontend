import { configureStore } from "@reduxjs/toolkit";
import agencySlice from "./agency/agencySlice";

export default configureStore({
  reducer: {
    agency: agencySlice,
  },
});
