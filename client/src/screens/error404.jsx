import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <section className="flex  items-center h-full p-16  dark:text-gray-500">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 animate-bounce-short font-extrabold text-9xl dark:text-gray-800 ">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-600 drop-shadow-lg">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400 ">
            But don't worry, we have plenty of other things on our homepage.
          </p>
          <Link
            to="/loading"
            className="px-8 py-3 hover:text-white hover:bg-blue-600 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error404;
