import { Form, Input, Upload, Button } from "antd";
import "antd/dist/antd.css";
import { PlusOutlined, VerticalLeftOutlined } from "@ant-design/icons";
import Axios from "axios";

const AddEmployee = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const employeeFile = values.upload.fileList[0].originFileObj;
    console.log(employeeFile);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const res = [];
      const data = reader.result.split("\n");
      for (var i = 0; i < data.length; i++) {
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
      Axios.post("http://localhost:3001/addEmployee", {
        data: {
          organizationId: localStorage.getItem("id"),
          employeeData: res,
        },
      })
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return undefined;
        });
    };
    reader.readAsText(employeeFile);
  };

  const onFinishFailed = (err) => {
    console.log(err);
  };

  return (
    <div>
      Add Employee
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="upload" label="upload">
          <Upload listType="picture-card" accept=".csv">
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployee;
