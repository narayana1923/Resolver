const { Router } = require("express");
const db = require("../database");

const router = Router();

router.post("/", (request, response) => {
  const id = request.body.data;
  let tickets = [];
  let projects = [];
  let ticketDetails = [];
  db.query(
    "select * from project " + "where organization_id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        response.send("NOT OK");
      } else {
        let pids = "";
        for (var i = 0; i < result.length; i++) {
          let projectRow = {};
          pids += `${result[i]["pid"]}`;
          if (i != result.length - 1) pids += ",";
          projectRow["pid"] = result[i]["pid"];
          projectRow["name"] = result[i]["name"];
          projectRow["start_date"] = result[i]["start_date"];
          projectRow["end_date"] = result[i]["end_date"];
          projectRow["status"] = result[i]["status"];
          let assignedEmployees = [];
          db.query(
            "select" +
              " assign_id,p.pid project_id,eid,assigned_on" +
              " from project p natural join project_assign pa " +
              "where p.pid=?",
            [projectRow["pid"]],
            (assignError, assignResult) => {
              if (assignError) {
                console.log(assignError);
                response.send("Not OK");
              }
              for (var i = 0; i < assignResult.length; i++) {
                let assignRow = {};
                assignRow["assign_id"] = assignResult[i]["assign_id"];
                assignRow["project_id"] = assignResult[i]["project_id"];
                assignRow["eid"] = assignResult[i]["eid"];
                assignRow["assigned_on"] = assignResult[i]["assigned_on"];
                assignedEmployees.push(assignRow);
              }
              projectRow["assignedEmployees"] = assignedEmployees;
              projects.push(projectRow);
            }
          );
        }
        db.query(
          "select * from ticket " + `where project_id in (${pids})`,
          [],
          (ticketError, ticketResult) => {
            if (ticketError) {
              console.log("Ticket error", ticketError);
              response.send("NOT OK");
            } else {
              let tids = "";
              for (var i = 0; i < ticketResult.length; i++) {
                let ticketRow = {};
                tids += `${ticketResult[i]["tid"]}`;
                if (i != ticketResult.length - 1) tids += ",";
                ticketRow["tid"] = ticketResult[i]["tid"];
                ticketRow["name"] = ticketResult[i]["name"];
                ticketRow["summary"] = ticketResult[i]["summary"];
                ticketRow["description"] = ticketResult[i]["description"];
                ticketRow["priority"] = ticketResult[i]["priority"];
                ticketRow["raised_date"] = ticketResult[i]["raised_date"];
                ticketRow["close_date"] = ticketResult[i]["close_date"];
                ticketRow["project_id"] = ticketResult[i]["project_id"];
                ticketRow["status"] = ticketResult[i]["status"];
                tickets.push(ticketRow);
              }
              db.query(
                "select * from ticketdetails " + `where tid in (${tids})`,
                [],
                (ticketDetailsError, ticketDetailsResult) => {
                  if (ticketDetailsError) {
                    console.log("ticketDetails error", ticketDetailsError);
                    response.send("NOT OK");
                  } else {
                    for (var i = 0; i < ticketDetailsResult.length; i++) {
                      let ticketDetailsRow = {};
                      ticketDetailsRow["tdid"] = ticketDetailsResult[i]["tdid"];
                      ticketDetailsRow["desc"] = ticketDetailsResult[i]["desc"];
                      ticketDetailsRow["postedat"] =
                        ticketDetailsResult[i]["postedat"];
                      ticketDetailsRow["generatedby"] =
                        ticketDetailsResult[i]["generatedby"];
                      ticketDetailsRow["tid"] = ticketDetailsResult[i]["tid"];
                      ticketDetails.push(ticketDetailsRow);
                    }
                    let data = {
                      organizationId: id,
                      projects: projects,
                      tickets: tickets,
                      ticketDetails: ticketDetails,
                    };
                    response.send(data);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
