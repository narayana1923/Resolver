const { Router } = require("express");
const db = require("../database");

const router = Router();

app.post("/addTicketDetails", (request, response) => {
  const { description, generatedBy, tid } = request.body.data;
  db.query(
    "INSERT INTO" +
      "`resolver`.`ticketdetails`" +
      "(`desc`,`generatedby`,`tid`)" +
      "VALUES(?,?,?)",
    [description, generatedBy, tid],
    (error, result) => {
      if (error) {
        console.log(error);
        return undefined;
      } else {
        return res.send("OK");
      }
    }
  );
});

app.post("/getTicketDetails", (request, response) => {
  const { tid } = request.body.data;
  db.query(
    "SELECT " +
      "`ticketdetails`.`tdid`," +
      "`ticketdetails`.`desc`," +
      "`ticketdetails`.`postedat`," +
      "`ticketdetails`.`generatedby`" +
      "FROM `resolver`.`ticketdetails`" +
      "where `ticketdetails`.`tid`=?" +
      "order by `ticketdetails`.`postedat`",
    [tid],
    (error, result) => {
      if (error) {
        console.log(error);
        return undefined;
      } else {
      }
    }
  );
});

module.exports = router;
