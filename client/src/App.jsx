import "./App.css";
import Home from "./screens/home";
import Loading from "./screens/Loading";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewProject from "./screens/viewProject";
import ViewTicket from "./screens/viewTicket";
import AllProjects from "./screens/allProjects";
import AllTickets from "./screens/allTickets";
import TempViewProject from "./screens/tempViewProject";
import First from "./screens/first";
import CompletedProjects from "./screens/completedProjects";
import OnGoingProjects from "./screens/onGoingProjects";
import ResolvedTickets from "./screens/resolvedTickets";
import ActiveTickets from "./screens/activeTickets";
import Error404 from "./screens/error404";

const App = () => {
  const email = sessionStorage.getItem("email");
  return (
    <div className="App">
      <Router>
        {/* <Affix>
          <Navbar />
        </Affix> */}
        <Routes>
          <Route exact path="/" element={<First />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/viewProject" element={<ViewProject />} />
          <Route exact path="/tempViewProject" element={<TempViewProject />} />
          <Route exact path="/viewTicket" element={<ViewTicket />} />
          <Route exact path="/allProjects" element={<AllProjects />} />
          <Route
            exact
            path="/completedProjects"
            element={<CompletedProjects />}
          />
          <Route exact path="/onGoingProjects" element={<OnGoingProjects />} />
          <Route exact path="/allTickets" element={<AllTickets />} />
          <Route exact path="/resolvedTickets" element={<ResolvedTickets />} />
          <Route exact path="/activeTickets" element={<ActiveTickets />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
