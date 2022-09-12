const initialState = {
  userDetails: {
    username: "",
    email: "",
    mobile_number: "",
  },
  projectDetails: {
    isProjectDetailsDataAvailable: false,
    retryProjectDetails: 0,
    projectData: {
      organizationId: "",
      projects: [],
    },
  },
};

export default initialState;
