const { Router } = require("express");
const db = require("../database");

const router = Router();

const getTicketDetails = async (ticketId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from ticketdetails " + `where tid = ?`,
      [ticketId],
      (ticketDetailsError, ticketDetailsResult) => {
        if (ticketDetailsError) {
          console.log("ticketDetails error", ticketDetailsError);
          reject("Error in ticket Details");
        } else {
          let ticketDetails = [];
          for (var i = 0; i < ticketDetailsResult.length; i++) {
            let ticketDetailsRow = {};
            ticketDetailsRow["tdid"] = ticketDetailsResult[i]["tdid"];
            ticketDetailsRow["desc"] = ticketDetailsResult[i]["desc"];
            ticketDetailsRow["postedat"] = ticketDetailsResult[i]["postedat"];
            ticketDetailsRow["tid"] = ticketDetailsResult[i]["tid"];
            ticketDetailsRow["eid"] = ticketDetailsResult[i]["eid"];
            ticketDetails.push(ticketDetailsRow);
          }
          resolve(ticketDetails);
        }
      }
    );
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

const getTickets = async (projectId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from ticket " + `where project_id = ?`,
      [projectId],
      async (ticketError, ticketResult) => {
        if (ticketError) {
          console.log("Ticket error", ticketError);
          reject("Error While Fetching tickets");
        } else {
          let tickets = [];
          for (var i = 0; i < ticketResult.length; i++) {
            let ticketRow = {};
            ticketRow["tid"] = ticketResult[i]["tid"];
            ticketRow["name"] = ticketResult[i]["name"];
            ticketRow["summary"] = ticketResult[i]["summary"];
            ticketRow["description"] = ticketResult[i]["description"];
            ticketRow["priority"] = ticketResult[i]["priority"];
            ticketRow["raised_date"] = ticketResult[i]["raised_date"];
            ticketRow["close_date"] = ticketResult[i]["close_date"];
            ticketRow["project_id"] = ticketResult[i]["project_id"];
            ticketRow["status"] = ticketResult[i]["status"];
            let ticketDetails = await getTicketDetails(ticketRow["tid"]);
            if (ticketDetails === undefined) {
              reject("Oops Something went wrong!!");
              return;
            } else {
              ticketRow["ticketDetails"] = ticketDetails;
              tickets.push(ticketRow);
            }
          }
          resolve(tickets);
        }
      }
    );
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

const getAssignedEmployees = async (projectId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select" +
        " assign_id,p.pid project_id,eid,assigned_on" +
        " from project p natural join project_assign pa " +
        "where p.pid=?",
      [projectId],
      (assignError, assignResult) => {
        if (assignError) {
          console.log(assignError);
          reject(assignError);
        } else {
          let assignedEmployees = [];
          for (var i = 0; i < assignResult.length; i++) {
            let assignRow = {};
            assignRow["assign_id"] = assignResult[i]["assign_id"];
            assignRow["project_id"] = assignResult[i]["project_id"];
            assignRow["eid"] = assignResult[i]["eid"];
            assignRow["assigned_on"] = assignResult[i]["assigned_on"];
            assignedEmployees.push(assignRow);
          }
          resolve(assignedEmployees);
        }
      }
    );
  })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

router.post("/", (request, response) => {
  const id = request.body.data;
  let tickets = [];
  let projects = [];
  let ticketDetails = [];
  db.query(
    "select * from project " + "where organization_id=?",
    [id],
    async (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send("Oops Something went wrong");
      } else {
        for (var i = 0; i < result.length; i++) {
          let projectRow = {};
          projectRow["pid"] = result[i]["pid"];
          projectRow["name"] = result[i]["name"];
          projectRow["start_date"] = result[i]["start_date"];
          projectRow["end_date"] = result[i]["end_date"];
          projectRow["status"] = result[i]["status"];
          let assignedEmployees = await getAssignedEmployees(projectRow["pid"]);
          if (assignedEmployees === undefined)
            return response.status(500).send("Oops Something went wrong");
          projectRow["assignedEmployees"] = assignedEmployees;
          let tickets = await getTickets(projectRow["pid"]);
          if (tickets === undefined)
            return response.status(500).send("Oops Something went wrong");
          projectRow["tickets"] = tickets;
          projects.push(projectRow);
        }
        let data = {
          organizationId: id,
          projects: projects,
        };
        return response.status(200).send(data);
      }
    }
  );
});

module.exports = router;
