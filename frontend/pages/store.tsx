import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./slices/landingSlice";
import meetCredReducer from "./slices/meetCredentialSlice";
import videoPageReducer from "./slices/videoSlice";

export const store = configureStore({
  reducer: {
    landingPage: landingReducer,
    meetCredPage: meetCredReducer,
    videoPage: videoPageReducer,
  },
});
