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
  db.query(
    "select * from resolver.organization where email=?",
    [email],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length === 0 || password !== result[0].password) {
          const data = {
            status: "NOT OK",
          };
          res.send(data);
        } else if (password === result[0].password) {
          console.log(result);
          let temp = result[0];
          const data = {
            status: "OK",
            id: temp.id,
            email: temp.email,
            name: temp.name,
            mobileNumber: temp.mobile_number,
          };
          res.send(data);
        }
      }
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
  const { name, expectedEndDate, id } = data;
  db.query(
    "INSERT INTO `resolver`.`project`(`name`,`start_date`,`end_date`,`status`,`organization_id`)VALUES(?,curdate(),?,'open',?)",
    [name, expectedEndDate, id],
    (err, result) => {
      if (err) return undefined;
      console.log("data", result.insertId);
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
          res.send(row);
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

app.listen(3001, () => {
  console.log("server is working");
});
