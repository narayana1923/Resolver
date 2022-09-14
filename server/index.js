const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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
      if (err) console.log(err);
      else res.send("User Registered");
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

app.post("/showProjects", (req, res) => {
  const id = req.body.data;
  db.query(
    "SELECT * FROM `resolver`.`project` where organization_id=?",
    [id],
    (err, result) => {
      if (err) return res.send("Not OK");
      else {
        let projects = [];
        for (var i = 0; i < result.length; i++) {
          let row = {};
          row["pid"] = result[i]["pid"];
          row["name"] = result[i]["name"];
          row["start_date"] = result[i]["start_date"];
          row["end_date"] = result[i]["end_date"];
          row["status"] = result[i]["status"];
          projects.push(row);
        }
        let data = {
          organizationId: id,
          projects: projects,
        };
        return res.send(data);
      }
    }
  );
});

app.post("/showEmployees", (req, res) => {
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
  let insertString = "";
  for (var i = 0; i < employeeData.length; i++) {
    const temp = employeeData[i];
    insertString +=
      `('${temp["name"]}','${temp["email"]}',` +
      `'${temp["mobileNumber"]}','${temp["role"]}',${organizationId}),`;
  }
  db.query(
    "INSERT INTO `resolver`.`employee`" +
      "(`name`,`email`,`mobile_number`,`role`,`organization_id`)" +
      `VALUES${insertString.slice(0, insertString.length - 1)}`,
    [],
    (err, result) => {
      if (err) console.log(err);
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
      if (err) return undefined;
      console.log("data", result.insertId);
      db.query(
        "SELECT * FROM `resolver`.`ticket` where tid =?",
        [result.insertId],
        (error, innerResult) => {
          if (error) return undefined;
          console.log(innerResult);
          let row = {};
          row["tid"] = innerResult[0]["tid"];
          row["name"] = innerResult[0]["name"];
          row["summary"] = innerResult[0]["summary"];
          row["priority"] = innerResult[0]["priority"];
          row["raised_date"] = innerResult[0]["raised_date"];
          row["close_date"] = innerResult[0]["close_date"];
          row["project_id"] = innerResult[0]["project_id"];
          response.send(row);
        }
      );
    }
  );
});

app.listen(3001, () => {
  console.log("server is working");
});
