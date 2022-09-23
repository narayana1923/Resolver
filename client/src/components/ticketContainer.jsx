import { Form, Modal, Tooltip } from "antd";
import { useSelector } from "react-redux";
import RaiseTicket from "./raiseTicket";
import TicketCard from "./ticketCard";
import { useState } from "react";

const TicketContainer = ({ priority, tickets, projectData }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialTickets, setInitialTickets] = useState(tickets);

  const handleModal = () => {
    form.resetFields();
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="flex px-10 mt-4 space-x-6 overflow-auto">
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">
            {priority} Priority Issues
          </span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {tickets.length}
          </span>
          <Tooltip
            placement="bottom"
            trigger="hover"
            title="Raise Issue"
            arrowPointAtCenter={false}
          >
            <button
              onClick={handleModal}
              className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          </Tooltip>
        </div>
        {initialTickets.slice(0, 3).map((ticket) => {
          return <TicketCard ticket={ticket} />;
        })}
      </div>
      <Modal
        title="Raise Ticket"
        open={isModalOpen}
        footer={[]}
        onCancel={handleModal}
        centered
      >
        <RaiseTicket
          handleModal={handleModal}
          form={form}
          priority={priority.toLowerCase()}
          projectData={projectData}
          setInitialTickets={setInitialTickets}
        />
      </Modal>
    </div>
  );
};

export default TicketContainer;
