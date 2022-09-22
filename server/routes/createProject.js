const { Router } = require("express");
const db = require("../database");

const router = Router();
router.post("/", (request, response) => {
  const { data } = request.body;
  const { name, expectedEndDate, id, employees } = data;
  db.query(
    "INSERT INTO `resolver`.`project`(`name`,`start_date`,`end_date`,`status`,`organization_id`)VALUES(?,curdate(),?,'open',?)",
    [name, expectedEndDate, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops something went wrong");
      }
      let insertString = "";
      for (var i = 0; i < employees.length; i++) {
        insertString += `('${result.insertId}','${employees[i]}',curdate())`;
        if (i != employees.length - 1) insertString += ",";
      }
      let returnData = {};
      db.query(
        "INSERT INTO `resolver`.`project_assign`" +
          "(`pid`,`eid`,`assigned_on`)" +
          "VALUES" +
          insertString,
        [result.insertId],
        (innerError, innerResult) => {
          if (innerError) {
            console.log(innerError);
            return response.status(500).send("Oops something went wrong");
          }
        }
      );
      db.query(
        "SELECT * FROM `resolver`.`project` where pid = ?",
        [result.insertId],
        (innerError, innerResult) => {
          if (innerError) {
            console.log(innerError);
            return response.status(500).send("Oops Something went wrong");
          }
          let row = {};
          row["pid"] = innerResult[0]["pid"];
          row["name"] = innerResult[0]["name"];
          row["start_date"] = innerResult[0]["start_date"];
          row["end_date"] = innerResult[0]["end_date"];
          row["status"] = innerResult[0]["status"];
        //   returnData["projectData"] = row;
          return response.status(200).send(row);
        }
      );
    }
  );
});

module.exports = router;
