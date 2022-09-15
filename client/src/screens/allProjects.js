import { Card, Button } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useState(false);
  const { projects, tickets } = useSelector(
    (state) => state.projectDetails.projectData
  );

  const handleProject = (item) => {
    navigate("/viewProject", { state: item });
  };

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-secondary">
      <div className="md:container md:mx-auto bg-white">
        <div className="px-2 py-2 grid grid-rows-4 grid-flow-col gap-2">
          {projects.map((item) => {
            return (
              <div
                className="mt-4"
                onClick={() => handleProject(item)}
                key={item.pid}
              >
                <Card
                  title={item.name}
                  style={{
                    width: 300,
                    borderWidth: 2,
                    cursor: "pointer",
                  }}
                  className="shadow-sm"
                >
                  <p>Project Id: {item.pid}</p>
                  <p>
                    Status: <span className="text-success">{item.status}</span>
                  </p>
                  <p>
                    Total no. of employees:{" "}
                    <span className="text-primary">
                      {item.assignedEmployees.length}
                    </span>
                  </p>
                  <p>
                    Number of tickets:{" "}
                    <span className="text-primary">
                      {
                        tickets.filter(
                          (ticket) => ticket.project_id == item.pid
                        ).length
                      }
                    </span>
                  </p>
                </Card>
              </div>
            );
          })}
          <Card
            title="Create Project"
            style={{
              width: 300,
              borderWidth: 2,
              backgroundColor: 'red'
            }}
            headStyle={{
              backgroundColor: 'white'
            }}
            className="shadow-sm mt-4"
          >
            <Button
              type="primary"
              onClick={handleModal}
            >
              Create Project
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
