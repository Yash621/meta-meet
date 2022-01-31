import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backwardClick: false,
};

export const meetCredPageSlice = createSlice({
  name: "meetCredPage",
  initialState,
  reducers: {
    setbackwardClick: (state, action) => {
      state.backwardClick = action.payload;
    },
  },
});

export const { setbackwardClick } = meetCredPageSlice.actions;

export const selectbackwardClick = (state) => state.meetCredPage.backwardClick;

export default meetCredPageSlice.reducer;
