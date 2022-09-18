const { Router } = require("express");
const db = require("../database");

const router = Router();

router.get("/", (request, response) => {
  const { ticketId } = request.body.data;
  db.query(
    "SELECT " +
      "`ticketdetails`.`tdid`," +
      "`ticketdetails`.`desc`," +
      "`ticketdetails`.`postedat`," +
      "`ticketdetails`.`generatedby`" +
      "FROM `resolver`.`ticketdetails`" +
      "where `ticketdetails`.`tid`=?" +
      "order by `ticketdetails`.`postedat`",
    [ticketId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went wrong");
      } else {
        let ticketDetails = [];
        for (var i = 0; i < result.length; i++) {
          let row = {};
          row["tdid"] = result[i]["tdid"];
          row["desc"] = result[i]["desc"];
          row["postedat"] = result[i]["postedat"];
          row["generatedby"] = result[i]["generatedby"];
          row["tid"] = result[i]["tid"];
          ticketDetails.push(row);
        }
        return response.status(200).send(ticketDetails);
      }
    }
  );
});

router.post("/", (request, response) => {
  const { description, employeeId, ticketId } = request.body.data;
  db.query(
    "INSERT INTO" +
      "`resolver`.`ticketdetails`" +
      "(`desc`,`generatedby`,`tid`)" +
      "VALUES(?,?,?)",
    [description, employeeId, ticketId],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went wrong");
      } else {
        db.query(
          "SELECT * FROM `resolver`.`ticketdetails` where tdid =?",
          [result.insertId],
          (innerError, innerResult) => {
            if (innerError) {
              console.log(innerError);
              response.status(500).send("Oops something went wrong");
            } else {
              console.log(innerResult);
              let row = {};
              row["tdid"] = innerResult[0]["tdid"];
              row["desc"] = innerResult[0]["desc"];
              row["postedat"] = innerResult[0]["postedat"];
              row["generatedby"] = innerResult[0]["generatedby"];
              row["tid"] = innerResult[0]["tid"];
              return response.status(200).send({ ticketDetails: row });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
