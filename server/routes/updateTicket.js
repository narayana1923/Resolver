const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  let {
    tid,
    name,
    summary,
    description,
    priority,
    raised_date,
    close_date,
    project_id,
    status,
  } = request.body.data;
  raised_date = raised_date.slice(0, raised_date.indexOf("T"));
  close_date = close_date.slice(0, close_date.indexOf("T"));
  db.query(
    "UPDATE `resolver`.`ticket`" +
      "SET" +
      "`tid` = ?," +
      "`name` = ?," +
      "`summary` = ?," +
      "`description` = ?," +
      "`priority` = ?," +
      "`raised_date` = ?," +
      "`close_date` = ?," +
      "`project_id` = ?," +
      "`status` = ?" +
      "WHERE `tid` = ?",
    [
      tid,
      name,
      summary,
      description,
      priority,
      raised_date,
      close_date,
      project_id,
      status,
      tid,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops something went wrong");
      } else {
        return response.status(200).send(request.body.data);
      }
    }
  );
});

module.exports = router;
