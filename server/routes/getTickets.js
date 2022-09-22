const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  const { projectId } = request.body.data;
  db.query(
    "SELECT" +
      "`ticket`.`tid`," +
      "`ticket`.`name`," +
      "`ticket`.`summary`," +
      "`ticket`.`description`," +
      "`ticket`.`priority`," +
      "`ticket`.`raised_date`," +
      "`ticket`.`close_date`," +
      "`ticket`.`project_id`" +
      "FROM `resolver`.`ticket`" +
      "where `ticket`.`project_id`=?",
    [projectId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went Wrong");
      } else {
        let tickets = [];
        // let tids = "";
        for (var i = 0; i < result.length; i++) {
          let row = {};
          // tids += `${ticketResult[i]["tid"]}`;
          // if (i != ticketResult.length - 1) tids += ",";
          row["tid"] = result[i]["tid"];
          row["name"] = result[i]["name"];
          row["summary"] = result[i]["summary"];
          row["description"] = result[i]["description"];
          row["priority"] = result[i]["priority"];
          row["raised_date"] = result[i]["raised_date"];
          row["close_date"] = result[i]["close_date"];
          row["project_id"] = result[i]["project_id"];
          row["status"] = result[i]["status"];
          tickets.push(row);
        }
        return response.status(200).send({ tickets: tickets });
      }
    }
  );
});

module.exports = router;
