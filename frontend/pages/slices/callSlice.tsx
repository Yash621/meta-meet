import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callCompShowState: true,
};

export const callSlice = createSlice({
  name: "callPage",
  initialState,
  reducers: {
    setCallCompShowState: (state, action) => {
      state.callCompShowState = action.payload;
    },
  },
});

export const { setCallCompShowState } = callSlice.actions;

export const selectCallCompShowState = (state) =>
  state.callPage.callCompShowState;
export default callSlice.reducer;
