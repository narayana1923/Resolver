const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const employeesRoute = require("./routes/employees");
const loginRoute = require("./routes/login");
const projectsRoute = require("./routes/projects");
const registerRoute = require("./routes/register");
const ticketsRoute = require("./routes/tickets");
const ticketDetailsRoute = require("./routes/ticketDetails");

app.use(cors());
app.use(express.json());
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/employees", employeesRoute);
app.use("/projects", projectsRoute);
app.use("/tickets", ticketsRoute);
app.use("/ticket-details", ticketDetailsRoute);

app.listen(PORT, () => {
  console.log("server is working");
});
