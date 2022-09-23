import React, { useState } from "react";
import reactLogo from "../assets/react.svg";

import { Sidebar } from "flowbite-react";

import { FaBug, FaCog, FaBolt, FaSignOutAlt } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddEmployee from "./addEmployee";
import { Form, Modal } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/loginSlice";
import CreateProject from "./createProject";

const Navbar = () => {
  const [form] = Form.useForm();
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleEmployeeModal = () => {
    form.resetFields();
    setEmployeeModalOpen(!isEmployeeModalOpen);
  };
  const handleProjectModal = () => {
    form.resetFields();
    setProjectModalOpen(!isProjectModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed top-0 rounded-md h-screen shadow">
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Logo href="#" img={reactLogo} imgAlt="Flowbite logo">
          Resolver
        </Sidebar.Logo>
        <Sidebar.Items className="bg-blue-200 p-10" colo>
          <Sidebar.ItemGroup>
            <Link className="text-dark" to="/home">
              <Sidebar.Item className="bg-black" icon={BsFillBarChartFill}>
                Overview
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Link className="text-dark" to="/allProjects">
              <Sidebar.Item icon={FaBolt}>Projects</Sidebar.Item>
            </Link>
            <Link className="text-dark" to="/allTickets">
              <Sidebar.Item icon={FaBug}>Issues</Sidebar.Item>
            </Link>
            <Sidebar.Item onClick={handleEmployeeModal} icon={FaCog}>
              Add Members
            </Sidebar.Item>
            <Sidebar.Item onClick={handleProjectModal} icon={MdWorkOutline}>
              Add Project
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup onClick={handleLogout}>
            <Sidebar.Item href="/" icon={FaSignOutAlt}>
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Modal
        title="Add Employees"
        open={isEmployeeModalOpen}
        footer={[]}
        onCancel={handleEmployeeModal}
        centered
      >
        <AddEmployee handleModal={handleEmployeeModal} form={form} />
      </Modal>
      <Modal
        title="Add Project"
        open={isProjectModalOpen}
        footer={[]}
        onCancel={handleProjectModal}
        centered
      >
        <CreateProject form={form} handleModal={handleProjectModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
