const { Router } = require("express");
const db = require("../database");

const router = Router();

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
