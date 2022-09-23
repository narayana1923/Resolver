import { Form, Input, Upload, Button, Switch, message } from "antd";
import "antd/dist/antd.css";
import { PlusOutlined, VerticalLeftOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useState } from "react";
import { putData } from "../store/api";
import { addEmployeeURL } from "../constants/urls";
import { useDispatch } from "react-redux";

const AddEmployee = ({ handleModal, form }) => {
  const [isBulkAdd, setBulkAdd] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);

    if (isBulkAdd === false) {
      const res = [values];
      const response = await putData(addEmployeeURL, {
        organizationId: localStorage.getItem("id"),
        employeeData: res,
      });
      console.log(response);
      handleModal();
      message.success("Added Employee");
    } else {
      const employeeFile = values.upload.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = async (e) => {
        const res = [];
        const data = reader.result.split("\n");
        for (var i = 1; i < data.length; i++) {
          const temp = data[i].split(",");
          if (temp.length === 5) {
            let obj = {
              name: temp[1],
              email: temp[2],
              mobileNumber: temp[3],
              role: temp[4],
            };
            res.push(obj);
          }
        }
        const response = await putData(addEmployeeURL, {
          organizationId: localStorage.getItem("id"),
          employeeData: res,
        });
        console.log(response);
        message.success("Added Employees");
      };
      reader.readAsText(employeeFile);
    }
    form.resetFields();
  };

  const onFinishFailed = (err) => {
    message.error("Please enter valid details");
    console.log(err);
  };

  const handleBulkAdd = () => {
    setBulkAdd(!isBulkAdd);
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
        <div className="flex w-ful justify-center mb-3">
          <span className="font-bold mr-2">Bulk Add?</span>
          <Switch
            size="large"
            checkedChildren="Yes"
            unCheckedChildren="No"
            onChange={handleBulkAdd}
          />
        </div>
        {!isBulkAdd && (
          <div>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email!" }]}
            >
              <Input size="large" placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name!" }]}
            >
              <Input size="large" placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter role!" }]}
            >
              <Input size="large" placeholder="Enter role" />
            </Form.Item>
            <Form.Item
              label="Mobile number"
              name="mobileNumber"
              rules={[
                { required: true, message: "Please enter mobile number!" },
              ]}
            >
              <Input placeholder="Enter mobile number" />
            </Form.Item>
          </div>
        )}
        {isBulkAdd && (
          <div>
            <Form.Item
              name="upload"
              label="Upload CSV file: "
              className="flex w-ful justify-center font-bold"
            >
              <Upload
                listType="picture-card"
                accept=".csv"
                className="font-normal"
                multiple={false}
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <span
              style={{
                position: "relative",
                top: -20,
              }}
              className="font-bold text-gray-400 text-capitalize flex w-ful justify-center"
            >
              Upload CSV file with columns
            </span>
            <span
              style={{
                position: "relative",
                top: -20,
              }}
              className="font-bold text-gray-400 text-capitalize flex w-ful justify-center"
            >
              name, email, mobile number, role
            </span>
          </div>
        )}
        <Form.Item className="flex w-ful justify-center">
          <Button type="primary" htmlType="submit">
            Add Employee{isBulkAdd && "s"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployee;
