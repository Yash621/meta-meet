import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meetCredentialPageShowState: false,
};

export const meetCredPageSlice = createSlice({
  name: "meetCredPage",
  initialState,
  reducers: {
    setmeetCredentialPageShowState: (state, action) => {
      state.meetCredentialPageShowState = action.payload;
    },
  },
});

export const { setmeetCredentialPageShowState } = meetCredPageSlice.actions;

export const selectmeetCredentialPageShowState = (state) =>
  state.meetCredPage.meetCredentialPageShowState;

export default meetCredPageSlice.reducer;
