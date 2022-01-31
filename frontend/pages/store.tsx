import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./slices/landingSlice";
import meetCredReducer from "./slices/meetCredentialSlice";

export const store = configureStore({
  reducer: {
    landingPage: landingReducer,
    meetCredPage: meetCredReducer,
  },
});
