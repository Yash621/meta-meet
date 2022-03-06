import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatCompShowState: false,
  chatCompShowStateType: "chat",
  chatCompSpaceName: "",
};

export const chatSlice = createSlice({
  name: "chatPage",
  initialState,
  reducers: {
    setChatCompShowState: (state, action) => {
      state.chatCompShowState = action.payload;
    },
    setChatCompShowStateType: (state, action) => {
      state.chatCompShowStateType = action.payload;
    },
    setChatCompSpaceName: (state, action) => {
      state.chatCompSpaceName = action.payload;
    },
  },
});

export const {
  setChatCompShowState,
  setChatCompShowStateType,
  setChatCompSpaceName,
} = chatSlice.actions;

export const selectChatCompShowState = (state) =>
  state.chatPage.chatCompShowState;
export const selectChatCompShowStateType = (state) =>
  state.chatPage.chatCompShowStateType;
export const selectChatCompSpaceName = (state) =>
  state.chatPage.chatCompSpaceName;
export default chatSlice.reducer;
