const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/login", (req, res) => {
  const { data } = req.body;
  const { email, password } = data;
  var loginData = {};
  db.query(
    "select * from resolver.organization where email=?",
    [email],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length === 0 || password !== result[0].password) {
          db.query(
            "select * from resolver.organization where email=?",
            [email],
            (error, innerResult) => {
              if (
                error ||
                innerResult.length === 0 ||
                password !== innerResult[0].password
              ) {
                const loginData = {
                  status: "NOT OK",
                };
                return;
              }
              let temp = result[0];
              loginData = {
                status: "OK",
                id: temp.id,
                email: temp.email,
                name: temp.name,
                mobileNumber: temp.mobile_number,
                userType: "employee",
              };
            }
          );
        } else if (password === result[0].password) {
          let temp = result[0];
          loginData = {
            status: "OK",
            id: temp.id,
            email: temp.email,
            name: temp.name,
            mobileNumber: temp.mobile_number,
            userType: "organization",
          };
        }
      }
      res.send(loginData);
    }
  );
});

module.exports = router;
