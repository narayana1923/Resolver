const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;
const { request, response } = require("express");
const addEmployeeRoute = require("./routes/addEmployee");
const addTicketDetailsRoute = require("./routes/addTicketDetails");
const createProjectRoute = require("./routes/createProject");
const getEmployeesRoute = require("./routes/getEmployees");
const getProjectsRoute = require("./routes/getProjects");
const getTicketDetailsRoute = require("./routes/getTicketDetails");
const getTicketsRoute = require("./routes/getTickets");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

app.use(cors());
app.use(express.json());
app.use("/addEmployee", addEmployeeRoute);
app.use("/addTicketDetails", addTicketDetailsRoute);
app.use("/createProject", createProjectRoute);
app.use("/getEmployees", getEmployeesRoute);
app.use("/getProjects", getProjectsRoute);
app.use("/getTicketDetails", getTicketDetailsRoute);
app.use("/getTickets", getTicketsRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(PORT, () => {
  console.log("server is working");
});
