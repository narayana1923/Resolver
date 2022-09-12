import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

const loginSlice = createSlice({
  name: "login",
  initialState: initialState.userDetails,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("username");
    },
    storeUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", state.username);
    },
    getUsername: (state) => {
      return state.username;
    },
  },
});

export const { storeUsername, getUsername, logout } = loginSlice.actions;

export default loginSlice.reducer;
