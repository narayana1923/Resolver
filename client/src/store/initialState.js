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
  employeeDetails: {
    isEmployeeDetailsDataAvailable: false,
    retryEmployeeDetails: 0,
    employeeData: {
      organizationId: "",
      employees: [],
    },
  },
};

export default initialState;
