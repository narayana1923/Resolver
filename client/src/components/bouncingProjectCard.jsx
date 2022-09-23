const BouncingProjectCard = ({ handleModal }) => {
  return (
    <div className="p-5 w-full bg-white p-25 rounded-xl shadow-xl motion-safe:animate-bounce ">
      <p className=" flex justify-center text-medium mb-5 text-gray-700">
        <b>Get started by creating a new project</b>
      </p>
      <button
        onClick={handleModal}
        className="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75"
      >
        Create New Project
      </button>
    </div>
  );
};

export default BouncingProjectCard;
