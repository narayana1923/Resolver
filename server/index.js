const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { request, response } = require("express");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "tiger",
  database: "resolver",
});

app.post("/login", (req, res) => {
  const { data } = req.body;
  const { email, password } = data;
  var loginData = {};
  db.query(
    "select * from resolver.organization where email=?",
    [email],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length === 0 || password !== result[0].password) {
          db.query(
            "select * from resolver.organization where email=?",
            [email],
            (error, innerResult) => {
              if (
                error ||
                innerResult.length === 0 ||
                password !== innerResult[0].password
              ) {
                const loginData = {
                  status: "NOT OK",
                };
                return;
              }
              let temp = result[0];
              loginData = {
                status: "OK",
                id: temp.id,
                email: temp.email,
                name: temp.name,
                mobileNumber: temp.mobile_number,
                userType: "employee",
              };
            }
          );
        } else if (password === result[0].password) {
          let temp = result[0];
          loginData = {
            status: "OK",
            id: temp.id,
            email: temp.email,
            name: temp.name,
            mobileNumber: temp.mobile_number,
            userType: "organization",
          };
        }
      }
      res.send(loginData);
    }
  );
});

app.post("/register", (req, res) => {
  const { data } = req.body;
  const { email, name, password, confirmPassword, mobileNumber } = data;
  db.query(
    "INSERT INTO `resolver`.`organization`(`email`,`name`,`mobile_number`,`password`)VALUES(?,?,?,?)",
    [email, name, mobileNumber, password],
    (err, result) => {
      if (err){
        console.log(err);
        res.send("Not Ok");
      }
      else res.send("Ok");
    }
  );
});

app.post("/createProject", (req, res) => {
  const { data } = req.body;
  const { name, expectedEndDate, id, employees } = data;
  db.query(
    "INSERT INTO `resolver`.`project`(`name`,`start_date`,`end_date`,`status`,`organization_id`)VALUES(?,curdate(),?,'open',?)",
    [name, expectedEndDate, id],
    (err, result) => {
      if (err) return undefined;
      let insertString = "";
      for (var i = 0; i < employees.length; i++) {
        insertString += `('${result.insertId}','${employees[i]}',curdate())`;
        if (i != employees.length - 1) insertString += ",";
      }
      console.log(insertString);
      let returnData = {};
      db.query(
        "INSERT INTO `resolver`.`project_assign`" +
          "(`pid`,`eid`,`assigned_on`)" +
          "VALUES" +
          insertString,
        [result.insertId],
        (error, innerResult) => {
          if (error) return undefined;
          console.log(innerResult);
          returnData["assignStatus"] = "OK";
        }
      );
      db.query(
        "SELECT * FROM `resolver`.`project` where pid = ?",
        [result.insertId],
        (error, innerResult) => {
          if (error) return undefined;
          console.log(innerResult);
          let row = {};
          row["pid"] = innerResult[0]["pid"];
          row["name"] = innerResult[0]["name"];
          row["start_date"] = innerResult[0]["start_date"];
          row["end_date"] = innerResult[0]["end_date"];
          row["status"] = innerResult[0]["status"];
          returnData["projectData"] = row;
          res.send(returnData);
        }
      );
    }
  );
});

app.post("/getProjects", (req, res) => {
  const id = req.body.data;
  let tickets = [];
  let projects = [];
  let ticketDetails = [];
  db.query(
    "select * from project " + "where organization_id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("NOT OK");
      } else {
        let pids = "";
        for (var i = 0; i < result.length; i++) {
          let projectRow = {};
          pids += `${result[i]["pid"]}`;
          if (i != result.length - 1) pids += ",";
          projectRow["pid"] = result[i]["pid"];
          projectRow["name"] = result[i]["name"];
          projectRow["start_date"] = result[i]["start_date"];
          projectRow["end_date"] = result[i]["end_date"];
          projectRow["status"] = result[i]["status"];
          let assignedEmployees = [];
          db.query(
            "select" +
              " assign_id,p.pid project_id,eid,assigned_on" +
              " from project p natural join project_assign pa " +
              "where p.pid=?",
            [projectRow["pid"]],
            (assignError, assignResult) => {
              if (assignError) {
                console.log(assignError);
                res.send("Not OK");
              }
              for (var i = 0; i < assignResult.length; i++) {
                let assignRow = {};
                assignRow["assign_id"] = assignResult[i]["assign_id"];
                assignRow["project_id"] = assignResult[i]["project_id"];
                assignRow["eid"] = assignResult[i]["eid"];
                assignRow["assigned_on"] = assignResult[i]["assigned_on"];
                assignedEmployees.push(assignRow);
              }
              projectRow["assignedEmployees"] = assignedEmployees;
              projects.push(projectRow);
            }
          );
        }
        db.query(
          "select * from ticket " + `where project_id in (${pids})`,
          [],
          (ticketError, ticketResult) => {
            if (ticketError) {
              console.log("Ticket error", ticketError);
              res.send("NOT OK");
            } else {
              let tids = "";
              for (var i = 0; i < ticketResult.length; i++) {
                let ticketRow = {};
                tids += `${ticketResult[i]["tid"]}`;
                if (i != ticketResult.length - 1) tids += ",";
                ticketRow["tid"] = ticketResult[i]["tid"];
                ticketRow["name"] = ticketResult[i]["name"];
                ticketRow["summary"] = ticketResult[i]["summary"];
                ticketRow["description"] = ticketResult[i]["description"];
                ticketRow["priority"] = ticketResult[i]["priority"];
                ticketRow["raised_date"] = ticketResult[i]["raised_date"];
                ticketRow["close_date"] = ticketResult[i]["close_date"];
                ticketRow["project_id"] = ticketResult[i]["project_id"];
                ticketRow["status"] = ticketResult[i]["status"];
                tickets.push(ticketRow);
              }
              db.query(
                "select * from ticketdetails " + `where tid in (${tids})`,
                [],
                (ticketDetailsError, ticketDetailsResult) => {
                  if (ticketDetailsError) {
                    console.log("ticketDetails error", ticketDetailsError);
                    res.send("NOT OK");
                  } else {
                    for (var i = 0; i < ticketDetailsResult.length; i++) {
                      let ticketDetailsRow = {};
                      ticketDetailsRow["tdid"] = ticketDetailsResult[i]["tdid"];
                      ticketDetailsRow["desc"] = ticketDetailsResult[i]["desc"];
                      ticketDetailsRow["postedat"] =
                        ticketDetailsResult[i]["postedat"];
                      ticketDetailsRow["generatedby"] =
                        ticketDetailsResult[i]["generatedby"];
                      ticketDetailsRow["tid"] = ticketDetailsResult[i]["tid"];
                      ticketDetails.push(ticketDetailsRow);
                    }
                    let data = {
                      organizationId: id,
                      projects: projects,
                      tickets: tickets,
                      ticketDetails: ticketDetails,
                    };
                    res.send(data);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/getEmployees", (req, res) => {
  const id = req.body.data;
  db.query(
    "SELECT " +
      "`employee`.`empid`," +
      "`employee`.`name`," +
      "`employee`.`email`," +
      "`employee`.`mobile_number`," +
      "`employee`.`role`" +
      "FROM `resolver`.`employee` where organization_id=?",
    [id],
    (err, result) => {
      if (err) return res.send("Not OK");
      else {
        let employees = [];
        for (var i = 0; i < result.length; i++) {
          let row = {};
          row["empid"] = result[i]["empid"];
          row["name"] = result[i]["name"];
          row["email"] = result[i]["email"];
          row["mobile_number"] = result[i]["mobile_number"];
          row["role"] = result[i]["role"];
          employees.push(row);
        }
        let data = {
          organizationId: id,
          employees: employees,
        };
        return res.send(data);
      }
    }
  );
});

app.post("/addEmployee", (request, response) => {
  const { organizationId, employeeData } = request.body.data;
  console.log(organizationId, employeeData);
  let insertString = "";
  for (var i = 0; i < employeeData.length; i++) {
    const temp = employeeData[i];
    console.log(temp);
    insertString +=
      `('${temp["name"]}','${temp["email"]}',` +
      `'${temp["mobileNumber"]}','${temp["role"]}',${organizationId})`;
    if (i != employeeData.length - 1) insertString += ",";
  }
  db.query(
    "INSERT INTO `resolver`.`employee`" +
      "(`name`,`email`,`mobile_number`,`role`,`organization_id`)" +
      `VALUES${insertString}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("NOT OK");
      }
      console.log(result);
      response.send("OK");
    }
  );
});

app.post("/raiseTicket", (request, response) => {
  const { data } = request.body;
  const { name, summary, description, priority, closeDate, projectId } = data;

  db.query(
    "INSERT INTO `resolver`.`ticket`" +
      "(`name`,`summary`,`description`,`priority`,`raised_date`,`close_date`,`project_id`)" +
      "VALUES(?,?,?,?,curdate(),?,?)",
    [name, summary, description, priority, closeDate, projectId],
    (err, result) => {
      if (err) {
        console.log(error);
        response.send("Not Ok");
      }
      console.log("data", result.insertId);
      db.query(
        "SELECT * FROM `resolver`.`ticket` where tid =?",
        [result.insertId],
        (error, innerResult) => {
          if (error) {
            console.log(error);
            response.send("Not Ok");
          }
          console.log(innerResult);
          let row = {};
          row["tid"] = innerResult[0]["tid"];
          row["name"] = innerResult[0]["name"];
          row["summary"] = innerResult[0]["summary"];
          row["priority"] = innerResult[0]["priority"];
          row["description"] = innerResult[0]["description"];
          row["raised_date"] = innerResult[0]["raised_date"];
          row["close_date"] = innerResult[0]["close_date"];
          row["project_id"] = innerResult[0]["project_id"];
          response.send(row);
        }
      );
    }
  );
});

app.post("/getTickets", (request, response) => {
  const { pid } = request.body.data;
  db.query(
    "SELECT" +
      "`ticket`.`tid`," +
      "`ticket`.`name`," +
      "`ticket`.`summary`," +
      "`ticket`.`description`," +
      "`ticket`.`priority`," +
      "`ticket`.`raised_date`," +
      "`ticket`.`close_date`," +
      "`ticket`.`project_id`" +
      "FROM `resolver`.`ticket`" +
      "where `ticket`.`project_id`=?",
    [pid],
    (error, result) => {}
  );
});

app.post("/addTicketDetails", (request, response) => {
  const { description, generatedBy, tid } = request.body.data;
  db.query(
    "INSERT INTO" +
      "`resolver`.`ticketdetails`" +
      "(`desc`,`generatedby`,`tid`)" +
      "VALUES(?,?,?)",
    [description, generatedBy, tid],
    (error, result) => {
      if (error) {
        console.log(error);
        return undefined;
      } else {
        return res.send("OK");
      }
    }
  );
});

app.post("/getTicketDetails", (request, response) => {
  const { tid } = request.body.data;
  db.query(
    "SELECT " +
      "`ticketdetails`.`tdid`," +
      "`ticketdetails`.`desc`," +
      "`ticketdetails`.`postedat`," +
      "`ticketdetails`.`generatedby`" +
      "FROM `resolver`.`ticketdetails`" +
      "where `ticketdetails`.`tid`=?" +
      "order by `ticketdetails`.`postedat`",
    [tid],
    (error, result) => {
      if (error) {
        console.log(error);
        return undefined;
      } else {
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server is working");
});
