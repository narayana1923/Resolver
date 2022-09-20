import {
  Card,
  Layout,
  List,
  Select,
  Input,
  Menu,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { useState } from "react";
import { putData } from "../store/api";
import { raiseTicket } from "../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../store/slices/projectsDetailsSlice";

const ViewProject = () => {
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
    <Layout>
      <Content>
        <Layout>
          <Sider width={240}>
            <div className="text-primary  ant-typography-h4">
              Project Details
            </div>
            <Card style={{ width: 220 }} className="bg-dark mx-2 mt-2">
              <h5 className="font-bold text-primary">Project Id</h5>
              <p className="font-normal text-white">{state.pid}</p>
            </Card>
            <Card style={{ width: 220 }} className="bg-dark mx-2 mt-2">
              <h5 className="font-bold text-primary">Project Name</h5>
              <p className="font-normal text-white">{state.name}</p>
            </Card>
            <Card style={{ width: 220 }} className="bg-dark mx-2 mt-2">
              <h5 className="font-bold text-primary">Project Status</h5>
              <p className="font-normal text-white">{state.status}</p>
            </Card>
            <Card style={{ width: 220 }} className="bg-dark mx-2 mt-2">
              <h5 className="font-bold text-primary">Project Start Date</h5>
              <p className="font-normal text-white">
                {" "}
                {state.end_date.slice(0, state.start_date.indexOf("T"))}
              </p>
            </Card>
            <Card style={{ width: 220 }} className="bg-dark mx-2 mt-2">
              <h5 className="font-bold text-primary">Project Target Date</h5>
              <p className="font-normal text-white">
                {state.end_date.slice(0, state.end_date.indexOf("T"))}
              </p>
            </Card>
          </Sider>
          <Content style={{ padding: "0 24px" }}>
            <div className="my-3 px-2 py-2 grid grid-rows-1 grid-flow-col gap-3">
              <div
                className="rounded-circle bg-white mx-5 shadow border-danger border-1"
                style={{ height: 200, width: 210 }}
              >
                <div className="mt-5 text-success ant-typography-h3">
                  Active Tickets
                </div>
                <div className="text-danger ant-typography-h1">
                  {activeTickets}
                </div>
              </div>
              <div
                className="rounded-circle bg-white shadow border-success border-1"
                style={{ height: 200, width: 210 }}
              >
                <div className="mt-5 ant-typography-h3">Total Employees</div>
                <div className="text-primary ant-typography-h1">
                  {assignedEmployees.length}
                </div>
              </div>
              <div
                className="rounded-circle bg-white shadow border-success border-1"
                style={{ height: 200, width: 210 }}
              >
                <div className="mt-5 text-danger ant-typography-h3">
                  Closed Tickets
                </div>
                <div className="text-success ant-typography-h1">
                  {closedTickets}
                </div>
              </div>
            </div>
            <div
              className="mx-3 font-bold ant-typography-h2 text-decoration-underline"
              style={{
                textAlign: "start",
              }}
            >
              Tickets Raised:
            </div>
            <div className="my-3 px-2 py-2 grid grid-flow-row auto-rows-max grid-cols-3 gap-3">
              {ticketData.map((item) => {
                return (
                  <Card
                    title={item.name}
                    key={item.tid}
                    style={{
                      width: 250,
                    }}
                    onClick={() => handleTicket(item)}
                  >
                    <p>{item.summary}</p>
                    <p>{item.description}</p>
                    <p>{item.raised_date}</p>
                  </Card>
                );
              })}
              <Col span={8}>
                <Card
                  title="Raise Ticket"
                  style={{
                    width: 300,
                  }}
                >
                  <Button type="primary" onClick={handleModal}>
                    Raise Ticket
                  </Button>
                </Card>
              </Col>
            </div>
          </Content>
          <Sider width={240} className="text-white">
            <div>Employee Details</div>
            {assignedEmployees.map((item) => {
              return (
                <Card key={item.empid} className="bg-dark mt-2">
                  <h5 className="font-bold text-primary">
                    <span>Employee-{item.empid}</span>
                    <span> Role: {item.role}</span>
                  </h5>
                  <p className="font-normal text-white">{item.email}</p>
                </Card>
                // <div key={item.empid} className="mt-3 ant-typography-h5">
                //   <span className="text-primary">Emp-{item.empid}: </span>
                //   <span style={{ cursor: "pointer" }} className=" text-danger">
                //     {item.email}
                //   </span>
                // </div>
              );
            })}
          </Sider>
        </Layout>
      </Content>
      <Modal
        title="Raise Ticket"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Name" name="name" initialValue="dummy">
            <Input placeholder="Enter Ticket Name" />
          </Form.Item>
          <Form.Item label="Summary" name="summary" initialValue="dummy">
            <TextArea
              rows={4}
              placeholder="Enter summary of the ticket"
              onLoad={handleDescription}
              onChange={handleSummary}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue="dummy"
          >
            <TextArea
              rows={4}
              placeholder="Enter description of the ticket"
              onLoad={handleDescription}
              onChange={handleDescription}
            />
          </Form.Item>
          <Form.Item label="Priority" name="priority" initialValue="Low">
            <Select defaultValue="Low">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Close Date"
            name="closeDate"
            initialValue="2022-12-12"
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="danger" htmlType="submit">
              Raise
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewProject;
