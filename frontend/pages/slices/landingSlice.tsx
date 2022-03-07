import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landingPageVisit: false,
  accessToken: null,
  authMethod: null,
  joinedGroups: [],
};

export const landingSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setLandingPageVisit: (state, action) => {
      state.landingPageVisit = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAuthMethod: (state, action) => {
      state.authMethod = action.payload;
    },
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
  },
});

export const {
  setLandingPageVisit,
  setAccessToken,
  setAuthMethod,
  setJoinedGroups,
} = landingSlice.actions;

export const selectlandingPageVisit = (state) =>
  state.landingPage.landingPageVisit;
export const selectAcessToken = (state) => state.landingPage.accessToken;
export const selectAuthMethod = (state) => state.landingPage.authMethod;
export const selectJoinedGroups = (state) => state.landingPage.joinedGroups;
export default landingSlice.reducer;
