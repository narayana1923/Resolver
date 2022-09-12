import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import projectDetailsSlice from "./slices/projectsDetailsSlice";

const store = configureStore({
  reducer: {
    userDetails: loginSlice,
    projectDetails: projectDetailsSlice,
  },
});

export default store;
