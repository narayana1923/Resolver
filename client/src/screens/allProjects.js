import { Card, Button, Modal, Form, Select, Input, Row, Col } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { createProject } from "../constants/urls";
import { putData } from "../store/api";
import { addProject } from "../store/slices/projectsDetailsSlice";

const AllProjects = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
    console.log(response);
    if (response !== undefined) dispatch(addProject(response));
  };

  const onFinishFailed = () => {
    console.log("Enter true values");
  };

  const handleProject = (item) => {
    navigate("/viewProject", { state: item });
  };

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="flex m-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow">
        <div className=" bg-wh-500">
          <div className="ml-6">
            <Row gutter={24} className="ml-2">
              {projects.map((item) => {
                return (
                  <Col
                    className="mt-4"
                    onClick={() => handleProject(item)}
                    key={item.pid}
                    span={8}
                  >
                    <Card
                      title={item.name}
                      style={{
                        width: 300,
                        borderWidth: 2,
                        cursor: "pointer",
                        // backgroundImage: "url(assets/card-background.jpg)",
                        // backgroundSize: "cover",
                        // color: "white",
                      }}
                      // headStyle={{ color: "white" }}
                      className="shadow-sm"
                    >
                      <p>Project Id: {item.pid}</p>
                      <p>
                        Status:{" "}
                        <span className="text-success">{item.status}</span>
                      </p>
                      <p>
                        Total no. of employees:{" "}
                        <span className="text-primary">
                          {item.assignedEmployees.length}
                        </span>
                      </p>
                      <p>
                        Number of tickets:{" "}
                        <span className="text-primary">
                          {
                            tickets.filter(
                              (ticket) => ticket.project_id == item.pid
                            ).length
                          }
                        </span>
                      </p>
                    </Card>
                  </Col>
                );
              })}
              <Card
                title="Create Project"
                style={{
                  width: 300,
                  borderWidth: 2,
                  backgroundColor: "red",
                }}
                headStyle={{
                  backgroundColor: "white",
                }}
                className="shadow-sm mt-4"
              >
                <Button type="primary" onClick={handleModal}>
                  Create Project
                </Button>
              </Card>
            </Row>
            {/* <div className="px-2 py-2 grid grid-rows-6 grid-flow-col grid-cols-3 gap-2">
                {projects.map((item) => {
                  return (
                    <div
                      className="mt-4"
                      onClick={() => handleProject(item)}
                      key={item.pid}
                    >
                      <Card
                        title={item.name}
                        style={{
                          width: 300,
                          borderWidth: 2,
                          cursor: "pointer",
                          // backgroundImage: "url(assets/card-background.jpg)",
                          // backgroundSize: "cover",
                          // color: "white",
                        }}
                        // headStyle={{ color: "white" }}
                        className="shadow-sm"
                      >
                        <p>Project Id: {item.pid}</p>
                        <p>
                          Status:{" "}
                          <span className="text-success">{item.status}</span>
                        </p>
                        <p>
                          Total no. of employees:{" "}
                          <span className="text-primary">
                            {item.assignedEmployees.length}
                          </span>
                        </p>
                        <p>
                          Number of tickets:{" "}
                          <span className="text-primary">
                            {
                              tickets.filter(
                                (ticket) => ticket.project_id == item.pid
                              ).length
                            }
                          </span>
                        </p>
                      </Card>
                    </div>
                  );
                })}
                <Card
                  title="Create Project"
                  style={{
                    width: 300,
                    borderWidth: 2,
                    backgroundColor: "red",
                  }}
                  headStyle={{
                    backgroundColor: "white",
                  }}
                  className="shadow-sm mt-4"
                >
                  <Button type="primary" onClick={handleModal}>
                    Create Project
                  </Button>
                </Card>
              </div> */}

            <Modal
              title="Create Project"
              open={isModalOpen}
              footer={[]}
              onCancel={handleModal}
            >
              <Form
                form={form}
                name="createProject"
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleModal}
                  >
                    Create Project
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
