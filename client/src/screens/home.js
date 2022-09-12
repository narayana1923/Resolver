import { Button, Form, Input } from "antd";
import Axios from "axios";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/slices/projectsDetailsSlice";

const Home = () => {
  const [form] = Form.useForm();
  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // const email = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const data = values;
    data["id"] = id;
    // data["email"] = email;
    Axios.post("http://localhost:3001/createProject", {
      data: values,
    })
      .then((response) => {
        console.log(response);
        if (response.data !== undefined) dispatch(addProject(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onFinishFailed = () => {
    console.log("Enter true values");
  };

  return (
    <div>
      <div>Hello world</div>
      {projects.map((item) => {
        return (
          <div>
            <ul>
              <li>{item.pid}</li>
              <li>{item.name}</li>
              <li>{item.start_date}</li>
              <li>{item.end_date}</li>
              <li>{item.status}</li>
            </ul>
          </div>
        );
      })}
      <Form
        form={form}
        name="registration"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="middle"
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item label="Expected End Date" name="expectedEndDate">
          <Input placeholder="Enter expected end data" type="date" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
