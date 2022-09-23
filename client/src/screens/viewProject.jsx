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
