import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import TicketDetails from "../components/ticketDetails";

const ViewTicket = () => {
  const { state } = useLocation();
  console.log(state);
  const { ticket, ticketDetails } = state;
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Navbar />
        <div className="flex-grow overflow-scroll">
          <div className=" bg-wh-500 p-4">
            <TicketDetails ticket={ticket} ticketDetails={ticketDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
