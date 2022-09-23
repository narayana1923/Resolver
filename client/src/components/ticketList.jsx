import { Col, Row } from "antd";
import TempCard from "./tempCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const navigate = useNavigate();
  const handleTicket = (ticket, ticketDetails) => {
    navigate("/viewTicket", {
      state: { ticket: ticket, ticketDetails: ticketDetails },
    });
  };
  return (
    <Row gutter={24} className="ml-2 ">
      {projects.map((project) => {
        let tickets = project.tickets;
        return tickets.map((ticket) => {
          return (
            <Col className="mb-4" span={8} key={ticket.tid}>
              <TempCard
                projectName={project.name}
                ticketId={ticket.tid}
                ticketName={ticket.name}
                ticketSummary={ticket.summary}
                handleTicket={() => handleTicket(ticket, ticket.ticketDetails)}
              />
            </Col>
          );
        });
      })}
    </Row>
  );
};

export default TicketList;
