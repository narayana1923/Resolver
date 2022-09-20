import React, { useState } from "react";
import reactLogo from "../assets/react.svg";

import { Sidebar } from "flowbite-react";

import { FaBug, FaCog, FaBolt, FaSignOutAlt } from "react-icons/fa";
import { BsFillBarChartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddEmployee from "../screens/addEmployee";
import { Form, Modal } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/loginSlice";

const Navbar = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleModal = () => {
    form.resetFields();
    setModalOpen(!isModalOpen);
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
            <Sidebar.Item onClick={handleModal} icon={FaCog}>
              Add Members
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
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
        className="ml-5"
      >
        <AddEmployee handleModal={handleModal} form={form} />
      </Modal>
    </div>
  );
};

export default Navbar;
