function Steps() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          1
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          Go to the{" "}
          <span className="font-semibold text-blue-500 dark:text-blue-400">
            Generate
          </span>{" "}
          section.
        </p>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          2
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          Enter your question for which you want a hint.
        </p>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          3
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          Check the hints and try solving the problem yourself.
        </p>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          4
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          Generate the full answer if needed.
        </p>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          5
        </div>
        <p className="text-gray-800 dark:text-gray-200">
          Click{" "}
          <span className="text-green-500 font-semibold dark:text-green-400">
            Save
          </span>{" "}
          to store your question and solution for future reference.
        </p>
      </div>
    </div>
  );
}

export default Steps;
