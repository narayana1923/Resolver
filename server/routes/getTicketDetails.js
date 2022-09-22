const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
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

module.exports = router;
