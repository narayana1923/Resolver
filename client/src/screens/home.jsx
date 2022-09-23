import Navbar from "../components/navbar";
import OverView from "../components/overview";
import ProjectList from "../components/projectsList";

const Home = () => {
  return (
    <div className="flex bg-gray-100">
      <Navbar />
      <div style={{ marginLeft: "18vw" }} className="flex-grow overflow-y-auto">
        <div className="h-screen bg-wh-500 p-4">
          <OverView />
        </div>
      </div>
    </div>
  );
};

export default Home;
