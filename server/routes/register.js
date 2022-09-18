const { Router } = require("express");
const db = require("../database");

const router = Router();
router.post("/register", (req, res) => {
  const { data } = req.body;
  const { email, name, password, confirmPassword, mobileNumber } = data;
  db.query(
    "INSERT INTO `resolver`.`organization`(`email`,`name`,`mobile_number`,`password`)VALUES(?,?,?,?)",
    [email, name, mobileNumber, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Not Ok");
      } else res.send("Ok");
    }
  );
});

module.exports = router;
