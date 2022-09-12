import { createSlice } from "@reduxjs/toolkit";
import getAsyncThunk from "../createThunk";
import initialState from "../initialState";
import { showProjects } from "../../constants/urls";

export const getProjectDetails = getAsyncThunk(
  "getProjectDetails",
  showProjects,
  localStorage.getItem("id")
);
const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState: initialState.projectDetails,
  reducers: {
    addProject: (state, action) => {
      state.projectData.projects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectDetails.rejected, (state) => {
      state.retryProjectDetails++;
    });
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      state.isProjectDetailsDataAvailable = true;
      console.log(action.payload);
      state.projectData = action.payload;
    });
  },
});

export const { addProject } = projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
