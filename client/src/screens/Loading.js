import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../store/slices/projectsDetailsSlice";
import Home from "./home";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const { isProjectDetailsDataAvailable, retryProjectDetails } = useSelector(
    (state) => state.projectDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isProjectDetailsDataAvailable) return;
    console.log("Trying");
    setTimeout(() => {
      dispatch(getProjectDetails());
    }, 3000);
  }, [retryProjectDetails]);

  const changePage = () => {
    navigate("/home");
  };

  return isProjectDetailsDataAvailable && changePage() ? (
    <></>
  ) : (
    <div>Loading..........</div>
  );
};

export default Loading;
