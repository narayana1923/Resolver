import { createSlice } from "@reduxjs/toolkit";
import getAsyncThunk from "../createThunk";
import initialState from "../initialState";
import { getProjects } from "../../constants/urls";

export const getProjectDetails = getAsyncThunk(
  "getProjectDetails",
  getProjects,
  localStorage.getItem("id")
);
const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState: initialState.projectDetails,
  reducers: {
    addProject: (state, action) => {
      state.projectData.projects.push(action.payload);
    },
    addTicket: (state, action) => {
      state.projectData.tickets.push(action.payload);
    },
    addTicketDetails: (state, action) => {
      state.projectData.ticketDetails.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectDetails.rejected, (state) => {
      state.retryProjectDetails++;
    });
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      state.isProjectDetailsDataAvailable = true;
      state.projectData = action.payload;
    });
  },
});

export const { addProject, addTicket, addTicketDetails } =
  projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
