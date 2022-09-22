import { Layout, Select, Input, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { useState } from "react";
import { putData } from "../store/api";
import { raiseTicket } from "../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../store/slices/projectsDetailsSlice";
import Navbar from "../components/navbar";
import ProjectTickets from "../components/projectTickets";

const TempViewProject = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Content, Sider } = Layout;
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  const { tickets } = useSelector((state) => state.projectDetails.projectData);
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );
  const ticketData = tickets.filter((item) => item.project_id == state.pid);
  let activeTickets = ticketData.filter(
    (item) => item.status === "open"
  ).length;
  let closedTickets = ticketData.length - activeTickets;
  let assignDetails = state.assignedEmployees;
  let assignedEmployees = employees.filter((item) => {
    for (var i = 0; i < assignDetails.length; i++) {
      if (item.empid == assignDetails[i].eid) return true;
    }
    return false;
  });
  let summary = "";
  let description = "";
  const onFinish = async (values) => {
    const data = values;
    data["summary"] = summary;
    data["description"] = description;
    data["projectId"] = state.pid;
    console.log(data);
    const response = await putData(raiseTicket, data);
    console.log(response);
    if (response !== undefined) dispatch(addTicket(response));
    setModalOpen(!isModalOpen);
  };

  const onFinishFailed = (err) => {
    console.log(err);
  };

  const handleSummary = (eve) => {
    summary = eve.target.value;
  };
  const handleDescription = (eve) => {
    description = eve.target.value;
  };
  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleTicket = (item) => {
    navigate("/viewTicket", { state: item });
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Navbar />
        <div
          style={{ marginLeft: "18vw" }}
          className="flex-grow overflow-y-auto overflow-x-hidden"
        >
          <div className=" bg-wh-500 p-4">
            <ProjectTickets projectData={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempViewProject;
