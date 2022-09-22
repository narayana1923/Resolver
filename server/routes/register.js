const { Router } = require("express");
const db = require("../database");

const router = Router();
router.post("/", (request, response) => {
  const { data } = request.body;
  const { email, name, password, confirmPassword, mobileNumber } = data;
  db.query(
    "INSERT INTO `resolver`.`organization`(`email`,`name`,`mobile_number`,`password`)VALUES(?,?,?,?)",
    [email, name, mobileNumber, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return response.status(500).send("Oops something went wrong");
      } else {
        return response.status(200).send("Registered Successfully");
      }
    }
  );
});

module.exports = router;
