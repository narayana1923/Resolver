const { Router } = require("express");
const db = require("../database");

const router = Router();

router.get("/", (request, response) => {
  const { organizationId } = request.body.data;
  db.query(
    "SELECT " +
      "`employee`.`empid`," +
      "`employee`.`name`," +
      "`employee`.`email`," +
      "`employee`.`mobile_number`," +
      "`employee`.`role`" +
      "FROM `resolver`.`employee` where organization_id=?",
    [organizationId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went wrong");
      } else {
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
          organizationId: organizationId,
          employees: employees,
        };
        return response.status(200).send(data);
      }
    }
  );
});

router.post("/", (request, response) => {
  const { organizationId, employeeData } = request.body.data;
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
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops something went wrong");
      } else {
        return response.status(200).send("Successfully Added the employees");
      }
    }
  );
});

module.exports = router;
