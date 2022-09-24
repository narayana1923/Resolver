import { Modal, Form } from "antd";

import React, { useState } from "react";
import Registration from "../components/registration";
import Login from "../components/login";

const First = () => {
  const [form] = Form.useForm();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const handleLoginModal = () => {
    form.resetFields();
    setLoginModalOpen(!isLoginModalOpen);
  };

  const handleRegistrationModal = () => {
    form.resetFields();
    setRegistrationModalOpen(!isRegistrationModalOpen);
  };

  return (
    <div className="first-body">
      <h1 className="first-h1">
        <span className="first-span"> BUG</span>
        <div className="first-message">
          <div className="first-word3">MANAGE</div>
          <div className="first-word2">TRACK</div>
          <div className="first-word3">RESOLVE</div>
        </div>
      </h1>

      <div className="first-flex-container">
        <div className="first-flex-child magenta">
          <div className="first-content mt-4 ml-4 ant-typography-h5">
            {/* <h1>Resolver</h1> */}
            <h3 className="first-one font-bold">
              Worrying about bugs in your software..?
            </h3>
            <br></br>
            <h3 className="first-one font-bold ml-4">
              Don't know how to monitor them{" "}
            </h3>
            <h3
              className="first-one font-bold ml-6 text-white"
              style={{ marginTop: 30 }}
            >
              You are in the right place!!
            </h3>
            {/* 
        <p>Record bugs easily, and track them based on desired criteria. Create custom views for your issue</p>
           <p>tracking software to focus on bugs that are the most time sensitive. See how many bugs have </p>
           <p>been logged, if they've been resolved, and more with reports.</p> */}
          </div>
        </div>

        <div className="first-flex-child green">
          <div className="first-Maincard">
            <div className="flex w-ful justify-center">
              <button className="first-Mainbutton" onClick={handleLoginModal}>
                Login
              </button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="flex w-ful justify-center">
              <button
                className="first-Mainbutton"
                onClick={handleRegistrationModal}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        bodyStyle={{
          backgroundColor: "#f6f6f6",
        }}
        className="first-modalStyle"
        title="Login"
        open={isLoginModalOpen}
        onCancel={handleLoginModal}
        footer={[]}
        centered
      >
        <Login handleModal={handleLoginModal} form={form} />
      </Modal>
      <Modal
        title="Registration Form"
        open={isRegistrationModalOpen}
        onCancel={handleRegistrationModal}
        footer={[]}
        centered
      >
        <Registration handleModal={handleRegistrationModal} form={form} />
      </Modal>
    </div>
  );
};

export default First;
