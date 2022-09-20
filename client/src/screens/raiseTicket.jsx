import { Button, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { raiseTicket } from "../constants/urls";
import { putData } from "../store/api";
import { addTicket } from "../store/slices/projectsDetailsSlice";

const RaiseTicket = ({ handleModal, form, priority, projectData }) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();
  let summary = "";
  let description = "";
  const onFinish = async (values) => {
    const data = values;
    data["summary"] = summary;
    data["description"] = description;
    data["projectId"] = projectData.pid;
    console.log(data);
    const response = await putData(raiseTicket, data);
    if (response !== undefined && response !== "Not Ok")
      dispatch(addTicket(response));
    console.log(response);
    form.resetFields();
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
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="middle"
      >
        <Form.Item
          label="Name"
          name="name"
          initialValue="dummy"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input size="large" placeholder="Enter Ticket Name" />
        </Form.Item>
        <Form.Item
          label="Summary"
          name="summary"
          initialValue="dummy"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <TextArea
            size="large"
            rows={4}
            placeholder="Enter summary of the ticket"
            onChange={handleSummary}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          initialValue="dummy"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <TextArea
            size="large"
            rows={4}
            placeholder="Enter description of the ticket"
            onChange={handleDescription}
          />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          initialValue={priority}
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Select size="large" defaultValue={priority}>
            <Option value="low">Low</Option>
            <Option value="moderate">Moderate</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Close Date"
          name="closeDate"
          initialValue="2022-12-12"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input size="large" type="date" />
        </Form.Item>
        <Form.Item>
          <Button type="danger" htmlType="submit" onClick={handleModal}>
            Raise Ticket
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RaiseTicket;
