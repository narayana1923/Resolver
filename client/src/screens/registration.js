import "../App.css";
import { Form, Button, Checkbox, Input, message } from "antd";
import { putData } from "../store/api";
import { register } from "../constants/urls";

const Registration = ({ form, handleModal }) => {
  const onFinish = async (values) => {
    console.log(values);
    const response = await putData(register, values);
    if (response === undefined || response === null || response === "Not Ok") {
      message.error("Something Went Wrong");
    } else {
      handleModal();
      form.resetFields();
      message.success("Successfully Registered. You can login now!!");
    }
  };

  const onFinishFailed = (error) => {
    console.log("Enter true values");
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size="middle"
      form={form}
    >
      <Form.Item
        name="name"
        label="Name"
        
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
          { whitespace: true },
          { min: 3 },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
          { Enter: "email", message: "Please enter a valid email" },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number"
        rules={[
          {
            required: true,
            message: "Please Enter your mobile number",
          },
          {
            min: 10,
            message: "Mobile Number must be at least 10 characters",
          },
          {
            max: 10,
            message: "Mobile Number cannot be longer than 10 characters",
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="Enter Mobile Number" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please Enter password",
          },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
        hasFeedback
      >
        <Input.Password size="large" placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please Enter Password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords doesn't match");
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password size="large" placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name="agreement"
        wrapperCol={{ span: 24 }}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    "To proceed, you need to agree with our terms and conditions"
                  ),
          },
        ]}
      >
        <Checkbox>
          {" "}
          Agree to our <a href="#">Terms and Conditions</a>
        </Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
