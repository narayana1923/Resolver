import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Button, message, Input } from "antd";
import { putData } from "../store/api";
import { createProjectURL } from "../constants/urls";
import { addProject } from "../store/slices/projectsDetailsSlice";

const CreateProject = ({ form, handleModal }) => {
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );
  const { Option } = Select;
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // const email = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const data = values;
    data["id"] = id;
    // data["email"] = email;
    console.log(values);
    const response = await putData(createProjectURL, data);
    if (response !== undefined) {
      dispatch(addProject(response));
      message.success("Successfully added the project");
    } else {
      message.error("Something went wrong please try again!");
    }
    handleModal();
  };

  const onFinishFailed = (error) => {
    console.log(error);
    message.error("Enter valid details");
  };
  return (
    <Form
      form={form}
      name="addProject"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="middle"
    >
      <Form.Item label="Name" name="name" initialValue="nara">
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        label="Expected End Date"
        name="expectedEndDate"
        initialValue="2022-12-12"
      >
        <Input placeholder="Enter expected end data" type="date" />
      </Form.Item>
      <Form.Item label="employees" name="employees">
        <Select
          placeholder="Select Employees for project"
          mode="multiple"
          showArrow={true}
          showSearch={true}
          maxTagCount={5}
          maxTagTextLength={10}
        >
          {employees.map((item) => {
            return (
              <Option key={item.empid} value={item.empid}>
                {item.email}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
