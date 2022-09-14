import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import "../css/register.css";

const Registration = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    Axios.post("http://localhost:3001/register", { data: values })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onFinishFailed = () => {
    console.log("Enter true values");
  };

  return (
    <div className="container">
      <div className="form">
        <Form
          form={form}
          name="registration"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="middle"
        >
          <Form.Item
            className="formItem"
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input size="large" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            className="formItem"
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input size="large" placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            className="formItem"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            className="formItem"
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            className="formItem"
            label="Mobile number"
            name="mobileNumber"
            rules={[{ required: true, message: "Please enter mobile number!" }]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>
          <Form.Item >
            <Button
              size="large"
              className="button"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
