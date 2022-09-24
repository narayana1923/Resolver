import { useSelector } from "react-redux";

const SingleComment = ({ ticketDetail }) => {
  const { employees } = useSelector(
    (state) => state.employeeDetails.employeeData
  );
  const raisedEmployee = employees.filter(
    (employee) => employee.id === ticketDetail.eid
  )[0];
  return (
    <div className=" px-16">
      <div className="md:w-1/2 w-full min-w-full">
        <div className="h-full  my-4 rounded-xl shadow-xl bg-blue-100 rounded-4 border-2 shadow p-3 ">
          <div className="flex justify-start">
            <span className="inline-flex items-center ">
              <img
                alt="testimonial"
                src="https://dummyimage.com/106x106"
                className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
              />
              <span className="flex-grow flex flex-col pl-4">
                <span className="title-font font-semibold text-sm text-gray-900">
                  {raisedEmployee === undefined
                    ? "Example"
                    : raisedEmployee.name}
                </span>
                <span className="text-gray-500 text-xs">
                  {raisedEmployee === undefined
                    ? "Example"
                    : raisedEmployee.role}
                </span>
              </span>
            </span>
          </div>
          <p className="flex text-justify leading-relaxed mt-3 ml-12">
            {ticketDetail.desc}
          </p>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default SingleComment;
