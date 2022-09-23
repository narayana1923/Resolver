const TempCard = ({
  projectName,
  ticketId,
  ticketName,
  ticketSummary,
  handleTicket,
}) => {
  return (
    <div className=" p-25 overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl hover:bg-yellow-400">
      {/* <img src="https://i.imgur.com/5dmBrx6.jpg" alt="plant" class="h-auto w-full" /> */}
      <div className="p-5">
        <h3>{projectName}</h3>
        {/* //TODO: Ticket Name and Id */}
        {/* <h3>
          {ticketName}-tid#{ticketId}
        </h3> */}
        <p className="text-medium mb-5 text-gray-700">{ticketSummary}</p>
        <button
          className="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75"
          onClick={handleTicket}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default TempCard;
