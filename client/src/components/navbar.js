import { Menu } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="nav-item" to="/home">
        Home
      </Link>
      <Link className="nav-item" to="/addEmployee">
        Add Employee
      </Link>
      <Link className="nav-item" to="/raiseTicket">
        Raise Ticket
      </Link>
    </div>
  );
};

export default Navbar;
