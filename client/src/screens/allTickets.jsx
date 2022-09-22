import Navbar from "../components/navbar";
import TicketList from "../components/ticketList";
const AllTickets = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div style={{ marginLeft: "18vw" }} className="flex-grow overflow-y-auto">
        <div className="bg-wh-500 p-4">
          <div>
            <h1 className="text-5xl font-semibold mt-2 ml-4">All Issues</h1>
            <TicketList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
