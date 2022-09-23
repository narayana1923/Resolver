import { createSlice } from "@reduxjs/toolkit";
import getAsyncThunk from "../createThunk";
import initialState from "../initialState";
import { getEmployeesURL } from "../../constants/urls";

export const getEmployeeDetails = getAsyncThunk(
  "getEmployeeDetails",
  getEmployeesURL,
  localStorage.getItem("id")
);
const employeeDetailsSlice = createSlice({
  name: "employeeDetails",
  initialState: initialState.employeeDetails,
  reducers: {
    addEmployee: (state, action) => {
      state.employeeData.employees.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployeeDetails.rejected, (state) => {
      state.retryEmployeeDetails++;
    });
    builder.addCase(getEmployeeDetails.fulfilled, (state, action) => {
      state.isEmployeeDetailsDataAvailable = true;
      console.log(action.payload);
      state.employeeData = action.payload;
    });
  },
});

export const { addEmployee } = employeeDetailsSlice.actions;

export default employeeDetailsSlice.reducer;
