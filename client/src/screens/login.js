import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUsername } from "../store/slices/loginSlice";
import "../css/login.css";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const email = "lcchinnu@gmail.com";
  const password = "nara";
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    const { data } = await Axios.post("http://localhost:3001/login", {
      data: values,
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });
    if (data["status"] === "OK") {
      dispatch(storeUsername(data["email"]));
      localStorage.setItem("id", data["id"]);
      localStorage.setItem("userType", data["userType"]);
      navigate("/loading");
    } else {
      console.log("Invalid username/password");
    }
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
            initialValue={email}
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input
              size="large"
              className="input"
              placeholder="Enter email"
              value={email}
            />
          </Form.Item>

          <Form.Item
            className="formItem"
            label="Password"
            name="password"
            initialValue={password}
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password
              size="large"
              className="input"
              placeholder="Enter password"
              value={password}
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              className="button"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
