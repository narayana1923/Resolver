import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../store/slices/projectsDetailsSlice";
import { getEmployeeDetails } from "../store/slices/employeeDetailsSlice";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
    // navigate("/allProjects");
  };

  return isProjectDetailsDataAvailable &&
    isEmployeeDetailsDataAvailable &&
    changePage() ? (
    <></>
  ) : (
    <div>
      <div className="flex w-ful justify-center mt-4">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 34 }} />} />
      </div>
      <div className="flex w-ful justify-center mt-3 text-primary font-bold ant-typography-h4">
        Loading... Please wait
      </div>
    </div>
  );
};

export default Loading;
