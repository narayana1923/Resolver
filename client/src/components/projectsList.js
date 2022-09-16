import React, { useState } from "react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { Form, Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projects, tickets } = useSelector(
    (state) => state.projectDetails.projectData
  );
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );

  const handleProject = (item) => {
    navigate("/viewProject", { state: item });
  };

  return (
    <div className="mt-8">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Project Name</Table.HeadCell>
          <Table.HeadCell>Open Issues</Table.HeadCell>
          <Table.HeadCell>Resolved Issues</Table.HeadCell>
          <Table.HeadCell>Members Involved</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Open</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {projects.slice(0, 5).map((item) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>
                  {
                    tickets.filter((ticket) => {
                      return (
                        ticket.project_id === item.pid &&
                        ticket.status === "open"
                      );
                    }).length
                  }
                </Table.Cell>
                <Table.Cell>
                  {
                    tickets.filter((ticket) => {
                      return (
                        ticket.project_id === item.pid &&
                        ticket.status === "close"
                      );
                    }).length
                  }
                </Table.Cell>
                <Table.Cell>{item.assignedEmployees.length}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => handleProject(item)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Open
                  </span>
                </Table.Cell>
              </Table.Row>
            );
          })}
          {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Sitara
              </Table.Cell>
              <Table.Cell>18</Table.Cell>
              <Table.Cell>26</Table.Cell>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Open
                </a>
              </Table.Cell>
            </Table.Row> */}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProjectList;
