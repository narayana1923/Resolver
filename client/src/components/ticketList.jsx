import { Col, Row } from "antd";
import TempCard from "./tempCard";
import { useSelector } from "react-redux";

const TicketList = () => {
  const { projects, tickets } = useSelector(
    (state) => state.projectDetails.projectData
  );
  return (
    <Row gutter={24} className="ml-2 ">
      {tickets.map((ticket) => {
        return (
          <Col className="mb-4" span={8} key={ticket.tid}>
            <TempCard
              projectName={""}
              ticketId={ticket.tid}
              ticketSummary={ticket.summary}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default TicketList;
