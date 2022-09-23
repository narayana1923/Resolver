import { createSlice } from "@reduxjs/toolkit";
import getAsyncThunk from "../createThunk";
import initialState from "../initialState";
import { getProjects } from "../../constants/urls";
import { current } from "@reduxjs/toolkit";

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
      const { projectId, ticket } = action.payload;
      for (var i = 0; i < state.projectData.projects.length; i++) {
        if (state.projectData.projects[i].pid === projectId) {
          state.projectData.projects[i].tickets.push(ticket);
          console.log(current(state.projectData.projects[i].tickets));
          break;
        }
      }
    },
    addTicketDetails: (state, action) => {
      let { projectId, ticketId, ticketDetail } = action.payload;
      for (var i = 0; i < state.projectData.projects.length; i++) {
        if (state.projectData.projects[i].pid === projectId) {
          for (
            var j = 0;
            j < state.projectData.projects[i].tickets.length;
            j++
          ) {
            if (state.projectData.projects[i].tickets[j].tid === ticketId) {
              state.projectData.projects[i].tickets[j].ticketDetails.push(
                ticketDetail
              );
              return;
            }
          }
        }
      }
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
