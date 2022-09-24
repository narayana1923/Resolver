const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  const { data } = request.body;
  const { email, password } = data;
  db.query(
    "select * from resolver.employee where email=?",
    [email],
    (error, result) => {
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
            role: temp.role,
            organizationId:
              temp.organization_id === null ? temp.id : temp.organization_id,
          };
          return response.status(200).send(loginData);
        } else {
          return response.status(403).send("Invalid username/password");
        }
      }
    }
  );
});

module.exports = router;
