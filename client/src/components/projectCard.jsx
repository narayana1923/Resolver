import { BiNotepad } from "react-icons/bi";
import { MdEventNote, MdPeopleOutline } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ProjectCard = ({
  projectId,
  projectName,
  projectStatus,
  employeeCount,
  activeTickets,
  resolvedTickets,
}) => {
  const color = projectStatus.toLowerCase() === "open" ? "lightgreen" : "red";
  return (
    <div
      //   style={{ backgroundColor: color }}
      className="flex flex-row  w-100 h-100 shadow border border-2 rounded-2 bg-green-100 text-green-700"
    >
      <div
        style={{ minWidth: 140 }}
        className="flex flex-col px-4 py-6 mt-4 font-bold text-5xl"
      >
        {projectId}00
      </div>
      <div className="flex flex-col py-6">
        <h1
          style={{ fontSize: 30 }}
          className="font-bold ml-1 position-relative top-2 text-green-900"
        >
          {projectName}
        </h1>
        <div className="mt-3 w-full flex text-sm font-medium text-slate-700 ">
          <MdPeopleOutline size={30} />
          <span className="ml-1 mt-1 text-primary">Employees Involved: </span>
          <span className="ml-1 mt-1 font-bold text-green-900">
            {employeeCount}
          </span>
        </div>
        <div className="mt-3 w-full flex text-sm font-medium text-slate-700">
          <BiNotepad size={30} />
          <span className="ml-1 mt-1 text-red-700">Issues in progress: </span>
          <span className="ml-1 mt-1 font-bold text-green-900">
            {activeTickets}
          </span>
        </div>
        <div className="mt-3 w-full flex text-sm font-medium text-slate-700">
          <IoCheckmarkDoneCircleSharp size={30} />
          <span className="ml-1 mt-1 text-yellow-700">Issues Resolved: </span>
          <span className="ml-1 mt-1 font-bold text-green-900">
            {resolvedTickets}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
