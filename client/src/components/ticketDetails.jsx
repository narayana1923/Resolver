import React from "react";

import { Card, Badge } from "flowbite-react";
import CommentSection from "./commentSection";

const TicketDetails = ({ ticket, ticketDetails }) => {
  const badge = (title) => {
    return (
      <Badge size={24} color="info">
        {title}
      </Badge>
    );
  };

  return (
    <div className="p-18 max-w-5xl">
      <Card href="#">
        <div>
          <h5 className="text-2xl mb-4 font-bold tracking-tight text-gray-900 dark:text-white">
            {ticket.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {ticket.summary}
          </p>
        </div>
        <div className="flex justify-end">
          <div className="max-w-fit flex space-x-2 justify-end">
            {badge("#UIDESIGN")}
            {badge("#UIDESIGN")}
            {badge("#UIDESIGN")}
            {badge("#UIDESIGN")}
          </div>
        </div>
      </Card>

      <CommentSection ticketDetails={ticketDetails} />
    </div>
  );
};

export default TicketDetails;
