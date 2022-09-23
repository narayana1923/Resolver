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

  return (
    <div>
      <div className="flex flex-col w-fit h-screen overflow-auto text-gray-700">
        <h1 className="text-2xl font-bold flex w-ful justify-start">
          Team Project Board
        </h1>
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
