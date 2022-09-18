const { Router, response } = require("express");
const db = require("../database");

const router = Router();

router.get("/", (request, response) => {
  const { organizationId } = request.body.data;
  let projects = [];
  db.query(
    "select * from project " + "where organization_id=?",
    [organizationId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went wrong");
      } else {
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
        return response.status(200).send({ projects: projects });
      }
    }
  );
});

router.post("/", (request, response) => {
  const { name, expectedEndDate, organizationId } = request.body.data;
  db.query(
    "INSERT INTO " +
      "`resolver`.`project`(`name`,`start_date`,`end_date`,`status`,`organization_id`)" +
      "VALUES(?,curdate(),?,'open',?)",
    [name, expectedEndDate, organizationId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went Wrong");
      } else {
        db.query(
          "SELECT * FROM `resolver`.`project` where pid = ?",
          [result.insertId],
          (innerError, innerResult) => {
            if (innerError) {
              console.log(innerError);
              return response.status(500).send("Oops Something went wrong");
            } else {
              let row = {};
              row["pid"] = innerResult[0]["pid"];
              row["name"] = innerResult[0]["name"];
              row["start_date"] = innerResult[0]["start_date"];
              row["end_date"] = innerResult[0]["end_date"];
              row["status"] = innerResult[0]["status"];
              return response.status(200).send({ project: row });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
