import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landingPageVisit: false,
};

export const landingSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setLandingPageVisit: (state, action) => {
      state.landingPageVisit = action.payload;
    },
  },
});

export const { setLandingPageVisit } = landingSlice.actions;

export const selectlandingPageVisit = (state) =>
  state.landingPage.landingPageVisit;

export default landingSlice.reducer;
 