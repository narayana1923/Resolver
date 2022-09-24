import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

const loginSlice = createSlice({
  name: "login",
  initialState: initialState.userDetails,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("organizationId");
    },
    storeUserDetails: (state, action) => {
      state = action.payload;
      sessionStorage.setItem("organizationId", state.organizationId);
    },
    getUsername: (state) => {
      return state.username;
    },
    getOrganizationId: (state) => {
      return state.organizationId;
    },
  },
});

export const { storeUserDetails, getUsername, logout } = loginSlice.actions;

export default loginSlice.reducer;
