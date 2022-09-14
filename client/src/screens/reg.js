import "../App.css";
import { Form, Button, Checkbox, DatePicker, Input, Select, Space } from "antd";

function Reg() {
  return (
    <div className="App">
      <div className="App-name">
        <h1 align="center">Registration Form</h1>
      </div>
      <div className="body">
        <header className="App-header">
          <Form
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={(values) => {
              console.log({ values });
            }}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <Form.Item
              name="fullName"
              // label="Full Name"
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
              Full Name: <Input placeholder="Type your name" />
            </Form.Item>
            <br></br>
            <Form.Item
              name="email"
              // label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                { type: "email", message: "Please enter a valid email" },
              ]}
              hasFeedback
            >
              Email: <Input placeholder="Type your email" />
            </Form.Item>
            <br></br>
            <Form.Item
              name="mobile"
              // label="Mobile Number"
              rules={[
                {
                  required: true,
                },
                { min: 10 },
              ]}
              hasFeedback
            >
              Mobile Number:{" "}
              <Input.Password placeholder="Type your Mobile Number" />
            </Form.Item>
            <br></br>
            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                },
                { min: 6 },
              ]}
              hasFeedback
            >
              Password: <Input.Password placeholder="Type your password" />
            </Form.Item>
            <br></br>
            <Form.Item
              name="confirmPassword"
              // label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered does not match."
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              Confirm Password:{" "}
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <br></br>
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
            <br></br>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </header>
      </div>
    </div>
  );
}

export default Reg;
