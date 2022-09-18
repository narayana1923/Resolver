const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/raiseTicket", (request, response) => {
  const { data } = request.body;
  const { name, summary, description, priority, closeDate, projectId } = data;

  db.query(
    "INSERT INTO `resolver`.`ticket`" +
      "(`name`,`summary`,`description`,`priority`,`raised_date`,`close_date`,`project_id`)" +
      "VALUES(?,?,?,?,curdate(),?,?)",
    [name, summary, description, priority, closeDate, projectId],
    (err, result) => {
      if (err) {
        console.log(error);
        response.send("Not Ok");
      }
      console.log("data", result.insertId);
      db.query(
        "SELECT * FROM `resolver`.`ticket` where tid =?",
        [result.insertId],
        (error, innerResult) => {
          if (error) {
            console.log(error);
            response.send("Not Ok");
          }
          console.log(innerResult);
          let row = {};
          row["tid"] = innerResult[0]["tid"];
          row["name"] = innerResult[0]["name"];
          row["summary"] = innerResult[0]["summary"];
          row["priority"] = innerResult[0]["priority"];
          row["description"] = innerResult[0]["description"];
          row["raised_date"] = innerResult[0]["raised_date"];
          row["close_date"] = innerResult[0]["close_date"];
          row["project_id"] = innerResult[0]["project_id"];
          response.send(row);
        }
      );
    }
  );
});

router.post("/getTickets", (request, response) => {
  const { pid } = request.body.data;
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
    [pid],
    (error, result) => {}
  );
});

module.exports = router;
