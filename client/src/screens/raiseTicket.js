import { Button, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { raiseTicket } from "../constants/urls";
import { putData } from "../store/api";

const RaiseTicket = () => {
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

  return (
    <div>
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
        <Form.Item label="Description" name="description" initialValue="dummy">
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
    </div>
  );
};

export default RaiseTicket;
