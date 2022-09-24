import SingleComment from "./singleComment";
import { useState } from "react";
import { message } from "antd";
import { putData } from "../store/api";
import { useDispatch } from "react-redux";
import { addTicketDetails } from "../store/slices/projectsDetailsSlice";
import { addTicketDetailsURL } from "../constants/urls";

const CommentSection = ({ ticketId, ticketDetails }) => {
  const [initialTicketDetails, setInitialTicketDetails] =
    useState(ticketDetails);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const changeComment = (event) => {
    setComment(event.target.value);
  };

  const handleComment = async () => {
    if (comment.length < 10) {
      message.warn("Comment should atleast be 10 characters");
    } else {
      const response = await putData(addTicketDetailsURL, {
        description: comment,
        ticketId: ticketId,
        employeeId: sessionStorage.getItem("organizationId"),
      });
      if (response === undefined) {
        message.error("Oops something went wrong");
      } else {
        message.success(comment);
        dispatch(addTicketDetails(response));
        setInitialTicketDetails((prevState) => {
          return [...prevState, response];
        });
      }
    }
  };

  return (
    <section className=" text-gray-600 body-font  mt-10 border rounded-3xl bg-blue-200 ">
      <div className="container px-5 py-10 mx-auto ">
        <div className="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          <h1 className="text-2xl font-medium title-font text-gray-900 mb-1 ">
            Comments
          </h1>
        </div>

        <div class="w-full md:w-full px-3 mb-2 mt-2">
          <textarea
            class="bg-white-500 rounded border border-stone-800 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Comment"
            required
            onChange={changeComment}
          ></textarea>
        </div>
        <div class="flex justify-end w-full md:w-full flex items-end md:w-full px-3">
          <div class="-mr-1">
            <input
              type="submit"
              class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:scale-105 hover:bg-blue-400"
              value="Post Comment"
              onClick={handleComment}
            />
          </div>
        </div>
        <div className=" -mx-4">
          {initialTicketDetails.map((ticketDetail) => {
            return <SingleComment ticketDetail={ticketDetail} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
