import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import projectDetailsSlice from "./slices/projectsDetailsSlice";
import employeeDetailsSlice from "./slices/employeeDetailsSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    projectDetails: projectDetailsSlice,
    employeeDetails: employeeDetailsSlice,
  },
});

export default store;
