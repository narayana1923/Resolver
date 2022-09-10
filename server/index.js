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
    "select email,password from resolver.organization where email=?",
    [email],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length === 0 || password !== result[0].password)
          res.send("Invalid username/password");
        else if (password === result[0].password)
          res.send("Logged in successfully");
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

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  db.query(
    "insert into reactpractice(name,age) values(?,?)",
    [name, age],
    (err, result) => {
      if (err) console.error(err);
      else res.send("Values inserted");
    }
  );
});

app.get("/show", (req, res) => {
  db.query("select * from reactpractice", (err, result) => {
    if (err) console.error(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("server is working");
});
