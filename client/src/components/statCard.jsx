import React from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon, screenName }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(screenName);
  };
  return (
    <div className="flex-grow cursor-pointer" onClick={handleClick}>
      <Card>
        <h5 className="mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="relative -top-2 ml-6 text-5xl font-extrabold tracking-tight">
            {value}
          </span>

          <div className="ml-auto">{icon}</div>
        </div>
      </Card>
    </div>
  );
};

export default StatCard;
