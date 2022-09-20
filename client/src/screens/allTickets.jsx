import Navbar from "../components/navbar";
const AllTickets = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div style={{ marginLeft: "18vw" }} className="flex-grow">
        <div className="bg-wh-500 p-4">
          <div class="grid h-screen place-items-center">
            <button>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
