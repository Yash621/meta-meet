import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  stream: false,
  mainUserId: null,
};

export const videoSlice = createSlice({
  name: "videoPage",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setStreamStatus: (state, action) => {
      state.stream = action.payload;
    },
    setMainUserId: (state, action) => {
      state.mainUserId = action.payload;
    },
  },
});

export const { setSocket, setStreamStatus, setMainUserId } = videoSlice.actions;

export const selectSocket = (state) => state.videoPage.socket;
export const selectStream = (state) => state.videoPage.stream;
export const selectMainUserId = (state) => state.videoPage.mainUserId;
export default videoSlice.reducer;
