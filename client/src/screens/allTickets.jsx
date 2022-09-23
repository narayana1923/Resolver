import Navbar from "../components/navbar";
import TicketList from "../components/ticketList";
import DisplayNothing from "../components/displayNothing";
import { useSelector } from "react-redux";

const AllTickets = () => {
  const { projects } = useSelector((state) => state.projectDetails.projectData);
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
              <h1 className="text-5xl font-semibold mt-2 ml-4">All Issues</h1>
              <TicketList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
