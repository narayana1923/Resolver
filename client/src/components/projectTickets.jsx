import TicketContainer from "./ticketContainer";
import { useSelector } from "react-redux";

const ProjectTickets = ({ projectData }) => {
  let { tickets } = projectData;
  const lowPriorityTickets = tickets.filter(
    (item) => item.priority.toLowerCase() === "low"
  );
  const moderatePriorityTickets = tickets.filter(
    (item) => item.priority.toLowerCase() === "moderate"
  );
  const highPriorityTickets = tickets.filter(
    (item) => item.priority.toLowerCase() === "high"
  );

  const DashboardCircle = ({ name, value, color }) => {
    return (
      <div
        className={`rounded-circle bg-white mx-5 shadow-xl  border-${color}-300 shadow-${color}-200 border-2`}
        style={{ height: 220, width: 230 }}
      >
        <div className=" flex justify-center mt-5 text-success ant-typography-h3">
          {name}
        </div>
        <div className="flex justify-center text-danger ant-typography-h1">
          {value}
        </div>
      </div>
    );
  };

  return (
    //TODO: Bottom margin
    <div>
      <div className="flex flex-col w-fit h-screen  text-gray-700">
        <h1 className="text-2xl font-bold flex w-ful justify-start">
          Team Project Board
        </h1>
        <div style={{ padding: "0 24px" }}>
          <div className="my-3 px-2 py-2 grid grid-rows-1 grid-flow-col gap-3">
            <DashboardCircle
              name={"Active Tickets"}
              value={
                projectData.tickets.filter((ticket) => ticket.status === "open")
                  .length
              }
              color={"green"}
            />
            <DashboardCircle
              name={"Employees Count"}
              value={projectData.assignedEmployees.length}
              color={"blue"}
            />
            <DashboardCircle
              name={"Resolved Tickets"}
              value={
                projectData.tickets.filter(
                  (ticket) => ticket.status === "close"
                ).length
              }
              color={"red"}
            />
          </div>
        </div>
        <div className="flex">
          <TicketContainer
            priority="High"
            tickets={highPriorityTickets}
            projectData={projectData}
          />
          <TicketContainer
            priority="Moderate"
            tickets={moderatePriorityTickets}
            projectData={projectData}
          />
          <TicketContainer
            priority="Low"
            tickets={lowPriorityTickets}
            projectData={projectData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTickets;
