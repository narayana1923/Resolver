import React, { useState } from "react";
import StatCard from "./statCard";
import { Table, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Form, Input, Select, Modal } from "antd";
import { putData } from "../store/api";
import { createProject } from "../constants/urls";
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

const OverView = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();

  const { projects, tickets } = useSelector(
    (state) => state.projectDetails.projectData
  );
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );

  const onFinish = async (values) => {
    // const email = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const data = values;
    data["id"] = id;
    // data["email"] = email;
    console.log(values);
    const response = await putData(createProject, data);
    if (response !== undefined) dispatch(addProject(response));
  };

  const onFinishFailed = () => {
    console.log("Enter true values");
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
          icon={<FaCheckCircle size={48} className="" color="green" />}
        />
        <StatCard
          title="In Progress"
          value={
            projects !== undefined
              ? projects.filter((item) => item.status === "open").length
              : 0
          }
          icon={<MdPendingActions size={48} className="" color="amber" />}
        />
        <StatCard
          title="Tickets Resolved"
          value={
            projects !== undefined
              ? tickets.filter((item) => item.status === "close").length
              : 0
          }
          icon={<FaStopCircle size={48} className="" color="red" />}
        />
        <StatCard
          title="Tickets Active"
          value={
            projects !== undefined
              ? tickets.filter((item) => item.status === "open").length
              : 0
          }
          icon={<FaBug size={48} className="" color="brown" />}
        />
      </div>

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
      <ProjectList />
      <Modal
        title="Create Project"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
      >
        <Form
          form={form}
          name="registration"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="middle"
        >
          <Form.Item label="Name" name="name" initialValue="nara">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Expected End Date"
            name="expectedEndDate"
            initialValue="2022-12-12"
          >
            <Input placeholder="Enter expected end data" type="date" />
          </Form.Item>
          <Form.Item label="employees" name="employees">
            <Select
              placeholder="Select Employees for project"
              mode="multiple"
              showArrow={true}
              showSearch={true}
              maxTagCount={5}
              maxTagTextLength={10}
            >
              {employees.map((item) => {
                return (
                  <Option key={item.empid} value={item.empid}>
                    {item.email}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleModal}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OverView;
