import Navbar from "../components/navbar";
import OverView from "../components/overview";
import ProjectList from "../components/projectsList";

const Home = () => {
  return (
    <div className="flex m-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow">
        <div className=" bg-wh-500 p-4">
          <OverView />
        </div>
      </div>
    </div>
  );
};

export default Home;
