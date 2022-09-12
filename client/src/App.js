import "./App.css";
import Home from "./screens/home";
import Login from "./screens/login";
import Registration from "./screens/register";
import Loading from "./screens/Loading";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      {/* <Registration /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/loading" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
