import Navbar from "../components/navbar";
import DisplayNothing from "../components/displayNothing";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import TempCard from "../components/tempCard";
import { useNavigate } from "react-router-dom";

const ActiveTickets = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const handleTicket = (ticket, ticketDetails) => {
    navigate("/viewTicket", {
      state: { ticket: ticket, ticketDetails: ticketDetails },
    });
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div
        style={{ marginLeft: "18vw" }}
        className="h-screen flex-grow overflow-y-auto"
      >
        <div className="bg-wh-500 p-4">
          {projects.length === 0 && (
            <div className="grid place-items-center h-screen relative -top-28">
              <DisplayNothing text={"Issues"} />
            </div>
          )}
          {projects.length !== 0 && (
            <div>
              <h1 className="text-5xl font-semibold mt-2 ml-4">
                Resolved Issues
              </h1>
              <Row gutter={24} className="ml-2 ">
                {projects.map((project) => {
                  let tickets = project.tickets;
                  return tickets.map((ticket) => {
                    if (ticket.status === "open") {
                      return (
                        <Col className="mb-4" span={8} key={ticket.tid}>
                          <TempCard
                            projectName={project.name}
                            ticketId={ticket.ticketId}
                            ticketSummary={ticket.summary}
                            handleTicket={() =>
                              handleTicket(ticket, ticket.ticketDetails)
                            }
                          />
                        </Col>
                      );
                    }
                  });
                })}
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveTickets;
