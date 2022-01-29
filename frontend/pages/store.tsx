import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./slices/landingSlice";

export const store = configureStore({
  reducer: {
    landingPage: landingReducer,
  },
});
