import { useNavigate } from "react-router-dom";
import Steps from "./Steps";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-10">
      <div
        className="bg-white rounded-3xl p-12 max-w-4xl text-center shadow-2xl border border-gray-300
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 font-sans dark:text-gray-100">
          Code Storage – Get Hints, Generate Solutions!
        </h1>

        <p className="text-lg text-gray-800 font-mono mb-8 dark:text-gray-200">
          Ask your question, receive a helpful hint, and then unlock the full
          solution. Learn faster and code smarter.
        </p>

        <button
          className="bg-indigo-600 text-white font-semibold py-3 px-10 rounded-xl shadow-lg 
                 hover:bg-indigo-700 transition-all duration-300 ease-in-out cursor-pointer text-lg
                 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-gray-100"
          onClick={() => navigate("/generate", { replace: true })}
        >
          Lessgo
        </button>
      </div>

      <div
        className="text-left font-mono text-lg leading-relaxed space-y-1 max-w-4xl text-gray-800
                  dark:text-gray-200"
      >
        <p>
          <span className="text-blue-600 dark:text-blue-400">while</span>(
          <span className="text-purple-600 dark:text-purple-400">alive</span>)
          {"{"}
        </p>
        <p className="ml-6">
          <span className="text-green-600 dark:text-green-400">eat</span>();
        </p>
        <p className="ml-6">
          <span className="text-green-600 dark:text-green-400">sleep</span>();
        </p>
        <p className="ml-6">
          <span className="text-green-600 dark:text-green-400">code</span>();
        </p>
        <p className="ml-6">
          <span
            className="text-yellow-600 font-bold cursor-pointer dark:text-yellow-400"
            onClick={() => navigate("/generate", { replace: true })}
          >
            store
          </span>
          ();
        </p>
        <p className="ml-6">
          <span className="text-green-600 dark:text-green-400">repeat</span>();
        </p>
        <p>{"}"}</p>
      </div>

      <div
        className="bg-white rounded-3xl p-10 md:p-14 max-w-4xl shadow-lg
                  dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-700/50"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center dark:text-gray-100">
          How to Use Code Storage
        </h2>
        <Steps />
      </div>
    </div>
  );
}

export default Home;
