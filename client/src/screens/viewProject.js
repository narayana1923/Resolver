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
import { useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import "../css/viewProject.css";
import { useState } from "react";
import { putData } from "../store/api";
import { raiseTicket } from "../constants/urls";

const ViewProject = () => {
  const { state } = useLocation();
  const { Content, Sider } = Layout;
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  let summary = "";
  let description = "";
  const onFinish = async (values) => {
    const data = values;
    data["summary"] = summary;
    data["description"] = description;
    data["projectId"] = 1;
    console.log(data);
    const response = await putData(raiseTicket, data);
    console.log(response);
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

  return (
    <Layout className="container">
      <Content>
        <Layout className="content">
          <Sider className="content" width={240}>
            <div>Project Details</div>
            <Menu>
              <Menu.Item>Project Id: {state.pid}</Menu.Item>
              <Menu.Item>Project Name: {state.name}</Menu.Item>
              <Menu.Item>Project date:{state.start_date}</Menu.Item>
              <Menu.Item>project date: {state.end_date}</Menu.Item>
              <Menu.Item>project date: {state.status}</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  title={"Ticket Name"}
                  style={{
                    width: 300,
                  }}
                >
                  <p>Card Details</p>
                  <p>Card Details</p>
                  <p>Card Details</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={"Ticket Name"}
                  style={{
                    width: 300,
                  }}
                >
                  <p>Card Details</p>
                  <p>Card Details</p>
                  <p>Card Details</p>
                </Card>
              </Col>
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
            </Row>
          </Content>
        </Layout>
      </Content>
      <Modal
        title="Raise Ticket"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Name" name="name" initialValue="dummy">
            <Input placeholder="Enter Ticket Name" />
          </Form.Item>
          <Form.Item label="Summary" name="summary" initialValue="dummy">
            <TextArea
              rows={4}
              placeholder="Enter summary of the ticket"
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
