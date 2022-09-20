import SingleComment from "./singleComment";

const CommentSection = ({ ticketDetails }) => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 py-10 mx-auto">
        <h1 className="text-2xl font-medium title-font text-gray-900 mb-1">
          Comments
        </h1>
        <div className=" -mx-4">
          {ticketDetails.map((ticketDetail) => {
            return <SingleComment ticketDetail={ticketDetail} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
