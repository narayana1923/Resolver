const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  const organizationId = request.body.data;
  db.query(
    "SELECT * FROM `resolver`.`employee` where organization_id=?",
    [organizationId],
    (error, result) => {
      if (error) {
        console.log(error); 
        return response.status(500).send("Oops Something went wrong");
      } else {
        let employees = [];
        for (var i = 0; i < result.length; i++) {
          let row = {};
          row["id"] = result[i]["id"];
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

module.exports = router;
