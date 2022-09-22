import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import TicketDetails from "../components/ticketDetails";

const ViewTicket = () => {
  const { state } = useLocation();
  const { ticket, ticketDetails } = state;
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Navbar />
        <div
          style={{ marginLeft: "18vw" }}
          className="flex-grow overflow-y-auto"
        >
          <div className=" bg-wh-500 p-4">
            <TicketDetails ticket={ticket} ticketDetails={ticketDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;