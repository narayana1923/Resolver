import React, { useState } from "react";
import StatCard from "./statCard";
import { Table, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Form, Input, Select, Modal } from "antd";
import { putData } from "../store/api";
import { createProjectURL } from "../constants/urls";
import { useDispatch } from "react-redux";

import {
  FaCheckCircle,
  FaStopCircle,
  FaUsers,
  FaPlusCircle,
  FaBug,
} from "react-icons/fa";

import { MdPendingActions } from "react-icons/md";
import { addProject } from "../store/slices/projectsDetailsSlice";
import ProjectList from "./projectsList";
import DisplayNothing from "./displayNothing";
import BouncingProjectCard from "./bouncingProjectCard";
import CreateProject from "./createProject";

const OverView = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const getTickets = () => {
    let tickets = [];
    for (var i = 0; i < projects.length; i++) {
      tickets.push(...projects[i].tickets);
    }
    return tickets;
  };

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold my-4">
        Overview of your organization
      </h1>
      <div className="stats flex  space-x-6 ">
        <StatCard
          title="Completed Projects"
          value={
            projects !== undefined
              ? projects.filter((item) => item.status === "completed").length
              : 0
          }
          icon={<FaCheckCircle size={48} color="green" />}
          screenName="/completedProjects"
        />
        <StatCard
          title="In Progress"
          value={
            projects !== undefined
              ? projects.filter((item) => item.status === "open").length
              : 0
          }
          icon={<MdPendingActions size={48} color="amber" />}
          screenName="/onGoingProjects"
        />
        <StatCard
          title="Tickets Resolved"
          value={
            projects !== undefined
              ? getTickets().filter((item) => item.status === "close").length
              : 0
          }
          icon={<FaStopCircle size={48} color="red" />}
          screenName="/resolvedTickets"
        />
        <StatCard
          title="Tickets Active"
          value={
            projects !== undefined
              ? getTickets().filter((item) => item.status === "open").length
              : 0
          }
          icon={<FaBug size={48} color="brown" />}
          screenName="/activeTickets"
        />
      </div>

      {projects.length !== 0 && (
        <h1 className="text-4xl font-semibold mt-12 mb-4">
          List of Projects:{" "}
          <span className=" flex w-ful justify-end">
            <span className="justify-self-end">
              <Button onClick={handleModal}>
                <FaPlusCircle className="mr-2 h-5 w-5" />
                Add New Project
              </Button>
            </span>
          </span>
        </h1>
      )}
      {projects.length !== 0 && <ProjectList />}
      {projects.length === 0 && <DisplayNothing text={"projects"} />}
      {projects.length === 0 && (
        <span className=" flex w-full justify-center mt-3">
          <span className="justify-self-center">
            <Button onClick={handleModal}>
              <FaPlusCircle className="mr-2 h-5 w-5" />
              Add A New Project
            </Button>
          </span>
        </span>
      )}
      <Modal
        title="Add Project"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
      >
        <CreateProject form={form} handleModal={handleModal} />
      </Modal>
    </div>
  );
};

export default OverView;
