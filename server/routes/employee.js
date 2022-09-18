const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/getEmployees", (req, res) => {
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

router.post("/addEmployee", (request, response) => {
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

module.exports = router;
