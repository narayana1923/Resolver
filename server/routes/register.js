const { Router } = require("express");
const db = require("../database");

const router = Router();
router.post("/", (request, response) => {
  const { data } = request.body;
  const {
    email,
    name,
    role,
    password,
    confirmPassword,
    mobileNumber,
    organizationId,
  } = data;
  db.query(
    "INSERT INTO `resolver`.`employee`" +
      "(`name`," +
      "`email`," +
      "`mobile_number`," +
      "`role`," +
      "`organization_id`," +
      "`password`)" +
      "VALUES" +
      "(?,?,?,?,?,?)",
    [name, email, mobileNumber, role, organizationId, password],
    (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops something went wrong");
      } else {
        data["id"] = result.insertId;
        if (organizationId === null) {
          db.query(
            "UPDATE `resolver`.`employee`" +
              "SET" +
              "`organization_id` = ? " +
              "WHERE `id` = ?",
            [result.insertId, result.insertId],
            (innerError, innerResult) => {
              if (innerError) {
                console.log(innerError);
                return response.status(500).send("Oops something went wrong");
              } else {
                data["organization_id"] = result.insertId;
                return response.status(200).send("Registered Successfully");
              }
            }
          );
        } else {
          return response.status(200).send("Registered Successfully");
        }
      }
    }
  );
});

module.exports = router;
