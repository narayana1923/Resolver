import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../store/slices/projectsDetailsSlice";
import { getEmployeeDetails } from "../store/slices/employeeDetailsSlice";
import Home from "./home";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const { isProjectDetailsDataAvailable, retryProjectDetails } = useSelector(
    (state) => state.projectDetails
  );
  const { isEmployeeDetailsDataAvailable, retryEmployeeDetails } = useSelector(
    (state) => state.employeeDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isProjectDetailsDataAvailable) return;
    setTimeout(() => {
      dispatch(getProjectDetails());
    }, 3000);
  }, [retryProjectDetails]);
  useEffect(() => {
    if (isEmployeeDetailsDataAvailable) return;
    setTimeout(() => {
      dispatch(getEmployeeDetails());
    }, 3000);
  }, [retryEmployeeDetails]);

  const changePage = () => {
    navigate("/home");
  };

  return isProjectDetailsDataAvailable &&
    isEmployeeDetailsDataAvailable &&
    changePage() ? (
    <></>
  ) : (
    <div>Loading..........</div>
  );
};

export default Loading;
