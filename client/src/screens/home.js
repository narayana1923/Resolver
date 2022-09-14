import { Button, Form, Input, Card, Row, Col, Modal, Select } from "antd";
import Axios from "axios";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/slices/projectsDetailsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { putData } from "../store/api";
import { createProject } from "../constants/urls";

const Home = () => {
  const [form] = Form.useForm();
  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const { Option } = Select;
  const onFinish = async (values) => {
    // const email = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const data = values;
    data["id"] = id;
    // data["email"] = email;
    console.log(values);
    const response = await putData(createProject, data);
    console.log(response);
    // if (response.data !== undefined) dispatch(addProject(response.data));
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
    <div>
      <Row gutter={16}>
        {projects.map((item) => {
          return (
            <Col span={8} onClick={() => handleProject(item)} key={item.pid}>
              <Card
                title={item.name}
                style={{
                  width: 300,
                }}
              >
                <p>{item.name}</p>
                <p>{item.start_date}</p>
                <p>{item.end_date}</p>
                <p>{item.status}</p>
              </Card>
            </Col>
          );
        })}
        <Col span={8}>
          <Card
            title="Create Project"
            style={{
              width: 300,
            }}
          >
            <Button type="primary" onClick={handleModal}>
              Create Project
            </Button>
          </Card>
        </Col>
      </Row>
      <Modal
        title="createProject"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
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

export default Home;
