import { replace, useNavigate } from "react-router-dom";
import Steps from "./Steps";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-10">
      <div className="bg-white rounded-3xl p-12 max-w-4xl text-center shadow-2xl border border-gray-300">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 font-sans">
          Code Storage – Get Hints, Generate Solutions!
        </h1>

        <p className="text-lg text-gray-800 font-mono mb-8">
          Ask your question, receive a helpful hint, and then unlock the full
          solution. Learn faster and code smarter.
        </p>

        <button
          className="bg-indigo-600 text-white font-semibold py-3 px-10 rounded-xl shadow-lg 
                 hover:bg-indigo-700 transition-all duration-300 ease-in-out cursor-pointer text-lg"
          onClick={() => navigate("/generate", { replace: true })}
        >
          Lessgo
        </button>
      </div>

      <div className="text-left font-mono text-lg leading-relaxed space-y-1 max-w-4xl text-gray-800">
        <p>
          <span className="text-blue-600">while</span>(
          <span className="text-purple-600">alive</span>){"{"}
        </p>
        <p className="ml-6">
          <span className="text-green-600">eat</span>();
        </p>
        <p className="ml-6">
          <span className="text-green-600">sleep</span>();
        </p>
        <p className="ml-6">
          <span className="text-green-600">code</span>();
        </p>
        <p className="ml-6">
          <span
            className="text-yellow-600 font-bold cursor-pointer"
            onClick={() => navigate("/generate", { replace: true })}
          >
            store
          </span>
          ();
        </p>
        <p className="ml-6">
          <span className="text-green-600">repeat</span>();
        </p>
        <p>{"}"}</p>
      </div>

      <div className="bg-white rounded-3xl p-10 md:p-14 max-w-4xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          How to Use Code Storage
        </h2>
        <Steps />
      </div>
    </div>
  );
}

export default Home;
