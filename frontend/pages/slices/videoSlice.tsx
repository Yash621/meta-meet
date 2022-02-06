import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

export const videoSlice = createSlice({
  name: "videoPage",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = videoSlice.actions;

export const selectSocket = (state) => state.videoPage.socket;

export default videoSlice.reducer;
