import React from "react";
import { Card } from "flowbite-react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex-grow ">
      <Card>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          {/* <span className="text-3xl font-semibold">
        $
      </span> */}
          <span className="text-5xl font-extrabold tracking-tight">
            {value}
          </span>

          <div className="ml-auto">{icon}</div>
          {/* <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
        /month
      </span> */}
        </div>
      </Card>
    </div>
  );
};

export default StatCard;
