const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "tiger",
  database: "resolver",
});

db.connect((error) => {
  if (error) throw new Error("Connection Error");
  console.log("Connected to database successfully");
});

module.exports = db;
