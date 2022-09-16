import "./App.css";
import Home from "./screens/home";
import Login from "./screens/login";
import Registration from "./screens/register";
import Loading from "./screens/Loading";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEmployee from "./screens/addEmployee";
import ViewProject from "./screens/viewProject";
import RaiseTicket from "./screens/raiseTicket";
import { useSelector } from "react-redux";
import { Affix } from "antd";
import Reg from "./screens/reg";
import Navbar from "./components/navbar";
import ViewTicket from "./screens/viewTicket";
import AllProjects from "./screens/allProjects";
import AllTickets from "./screens/allTickets";

const App = () => {
  const email = localStorage.getItem("email");
  return (
    <div className="App">
      <Router>
        {/* <Affix>
          <Navbar />
        </Affix> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/reg" element={<Reg />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/addEmployee" element={<AddEmployee />} />
          <Route exact path="/viewProject" element={<ViewProject />} />
          <Route exact path="/raiseTicket" element={<RaiseTicket />} />
          <Route exact path="/viewTicket" element={<ViewTicket />} />
          <Route exact path="/allProjects" element={<AllProjects />} />
          <Route exact path="/allTickets" element={<AllTickets />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
