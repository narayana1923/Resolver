const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const employeeRoute = require("./routes/employee");
const loginRoute = require("./routes/login");
const projectRoute = require("./routes/project");
const registerRoute = require("./routes/register");
const ticketRoute = require("./routes/ticket");
const ticketDetailsRoute = require("./routes/ticketDetails");

app.use(cors());
app.use(express.json());
app.use("/employee", employeeRoute);
app.use("/login", loginRoute);
app.use("/project", projectRoute);
app.use("/register", registerRoute);
app.use("/ticket", ticketRoute);
app.use("/ticketDetails", ticketDetailsRoute);

app.listen(PORT, () => {
  console.log("server is working");
});
