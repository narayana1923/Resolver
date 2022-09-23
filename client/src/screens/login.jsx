import { Form, Input, Button, message } from "antd";

import React from "react";
import loginImg from "../assets/login.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/api";
import { storeUsername } from "../store/slices/loginSlice";
import { loginURL } from "../constants/urls";

const Login = ({ handleModal, form }) => {
  const dispatch = useDispatch();
  const email = "lcchinnu@gmail.com";
  const password = "nara";
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const data = await fetchData(loginURL, values);
    if (data !== undefined) {
      dispatch(storeUsername(data["email"]));
      localStorage.setItem("id", data["id"]);
      localStorage.setItem("userType", data["userType"]);
      message.success("Welcome " + data["name"], 1);
      handleModal();
      form.resetFields();
      navigate("/loading");
    } else {
      message.error("Invalid username/password", 1);
      console.log("Invalid username/password");
    }
  };

  const onFinishFailed = () => {
    console.log("Enter true values");
  };

  return (
    <div>
      <div className="flex w-ful justify-center mb-3">
        <img
          src={loginImg}
          width="300"
          style={{ position: "relative" }}
          alt="login"
        />
      </div>
      <div className="flex w-ful justify-center mb-3">
        <div
          style={{ height: 300, width: 350, borderRadius: 10 }}
          className="first-border-2 bg-white shadow"
        >
          <div className="text-3xl mb-2 px-4 mb-3 mt-3">Login</div>
          <Form
            className="px-3"
            size="middle"
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              initialValue={email}
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                size="large"
                className="rounded-3"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue={password}
              rules={[{ required: true, message: "Please enter password!" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined color="rgba(0,0,0,.25)" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="first-login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
