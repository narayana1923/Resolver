import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projectCard";
import Navbar from "../components/navbar";
import DisplayNothing from "../components/displayNothing";

const OnGoingProjects = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projectDetails.projectData);
  const inProgressProjects = projects.filter(
    (project) => project.status === "open"
  );

  const handleProject = (item) => {
    navigate("/viewProject", { state: item });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div
        style={{ marginLeft: "18vw" }}
        className="flex-grow overflow-y-auto overflow-x-hidden"
      >
        <div className="bg-wh-500 p-2">
          {inProgressProjects.length === 0 && (
            <div className="grid place-items-center h-screen relative -top-5">
              <DisplayNothing text={"on going projects"} />
            </div>
          )}
          {inProgressProjects.length !== 0 && (
            <div>
              <h1 className="text-5xl font-semibold mt-4 ml-4">
                On Going Projects
              </h1>
              <div className="ml-2">
                <Row gutter={24} className="ml-2">
                  {inProgressProjects.map((item) => {
                    return (
                      <Col
                        className="mb-4"
                        onClick={() => handleProject(item)}
                        key={item.pid}
                        span={8}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <ProjectCard
                          projectId={item.pid}
                          projectName={item.name}
                          projectStatus={item.status}
                          employeeCount={item.assignedEmployees.length}
                          activeTickets={0}
                          resolvedTickets={item.tickets.length}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnGoingProjects;
