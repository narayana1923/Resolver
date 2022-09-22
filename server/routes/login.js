const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  const { data } = request.body;
  const { email, password } = data;
  db.query(
    "select * from resolver.organization where email=?",
    [email],
    (error, result) => {
      console.log(data);
      console.log(result);
      if (error) {
        console.log(error);
        return response.status(500).send("Oops something went wrong");
      } else {
        if (result.length !== 0 && password === result[0].password) {
          let temp = result[0];
          const loginData = {
            id: temp.id,
            email: temp.email,
            name: temp.name,
            mobileNumber: temp.mobile_number,
            userType: "organization",
          };
          return response.status(200).send(loginData);
        } else {
          db.query(
            "select * from resolver.employee where email=?",
            [email],
            (innerError, innerResult) => {
              if (innerError) {
                return response.status(500).send("Oops something went wrong");
              } else if (
                innerResult.length !== 0 &&
                password === innerResult[0].password
              ) {
                let temp = innerResult[0];
                const loginData = {
                  id: temp.id,
                  email: temp.email,
                  name: temp.name,
                  mobileNumber: temp.mobile_number,
                  userType: "employee",
                };
                return response.status(200).send(loginData);
              } else {
                return response.status(403).send("Invalid username/password");
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
