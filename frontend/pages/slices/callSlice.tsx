import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callCompShowState: false,
  callCompShowStateType: "",
};

export const callSlice = createSlice({
  name: "callPage",
  initialState,
  reducers: {
    setCallCompShowState: (state, action) => {
      state.callCompShowState = action.payload;
    },
    setCallCompShowStateType: (state, action) => {
      state.callCompShowStateType = action.payload;
    },
  },
});

export const { setCallCompShowState, setCallCompShowStateType } =
  callSlice.actions;

export const selectCallCompShowState = (state) =>
  state.callPage.callCompShowState;
export const selectCallCompShowStateType = (state) =>
  state.callPage.callCompShowStateType;
export default callSlice.reducer;
