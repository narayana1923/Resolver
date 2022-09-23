import { Button, Dropdown, Form, Menu, message, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTicketURL } from "../constants/urls";
import { putData } from "../store/api";
import { updateTicket } from "../store/slices/projectsDetailsSlice";

const TicketCard = ({ ticket }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [initialTicket, setInitialTicket] = useState(ticket);
  const [isModalOpen, setModalOpen] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState(ticket.priority);
  const { Option } = Select;
  const dispatch = useDispatch();

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const onFinish = async (values) => {
    if (values.priority === defaultPriority) {
      message.warn("Old and new priority cannot be same");
    } else {
      handleModal();
      const data = { ...ticket };
      delete data.ticketDetails;
      data["priority"] = values.priority;
      const response = await putData(updateTicketURL, data);
      if (response !== undefined) {
        setInitialTicket((prevState) => {
          return {
            ...prevState,
            ...response,
          };
        });
        dispatch(updateTicket(response));
        message.success(
          `Changed ticket priority to ${values.priority}\nreload to view changes`
        );
      } else {
        message.error("Oops something went wrong while changing priority");
      }
    }
  };
  const onFinishFailed = (error) => {
    message.error(error);
  };

  const handleCloseTicket = async () => {
    const data = { ...ticket };
    delete data.ticketDetails;
    data["status"] = "close";
    const response = await putData(updateTicketURL, data);
    if (response !== undefined) {
      setInitialTicket((prevState) => {
        return {
          ...prevState,
          ...response,
        };
      });
      dispatch(updateTicket(response));
      message.success("Closed the ticket");
    } else {
      message.error("Oops something went wrong");
    }
  };

  const popUpMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleCloseTicket}>Close Ticket</Menu.Item>
        <Menu.Item onClick={handleModal}>Change Priority</Menu.Item>
      </Menu>
    );
  };

  const handleTicket = () => {
    navigate("/viewTicket", {
      state: { ticket: initialTicket, ticketDetails: ticket.ticketDetails },
    });
  };

  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
    >
      <Dropdown
        overlay={popUpMenu}
        placement="bottom"
        arrow={{
          pointAtCenter: true,
        }}
      >
        <button className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 ">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </Dropdown>
      {initialTicket.status === "close" && (
        <span className="flex items-center h-6 px-3 text-xs font-semibold text-red-500 bg-red-100 rounded-full">
          {initialTicket.status}
        </span>
      )}
      {initialTicket.status === "open" && (
        <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
          {initialTicket.status}
        </span>
      )}

      <div className="w-full h-ful" onClick={handleTicket}>
        <h4 className="mt-3 text-sm font-medium">{initialTicket.summary}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {initialTicket.raised_date.slice(
                0,
                initialTicket.raised_date.indexOf("T")
              )}
            </span>
          </div>
          <div className="relative flex items-center ml-4">
            <svg
              className="relative w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {initialTicket.ticketDetails === undefined
                ? 0
                : initialTicket.ticketDetails.length}
            </span>
          </div>
          <div className="flex items-center ml-4">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">1</span>
          </div>
          <img
            className="w-6 h-6 ml-auto rounded-full"
            src="https://randomuser.me/api/portraits/men/64.jpg"
          />
        </div>
      </div>
      <Modal
        title="Raise Ticket"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="middle"
        >
          <Form.Item
            label="Priority"
            name="priority"
            initialValue={defaultPriority}
          >
            <Select
              defaultValue={defaultPriority}
              value={defaultPriority}
              size="large"
            >
              <Option value="low">Low</Option>
              <Option value="moderate">Moderate</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Update Priority
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TicketCard;
