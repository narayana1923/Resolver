import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    Axios.post("http://localhost:3001/login", { data: values })
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
    <div className="container-fluid">
      <Form
        form={form}
        name="registration"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="middle"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
