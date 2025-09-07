import { useNavigate } from "react-router-dom";
import CodeStoreSteps from "./CodeStoreSteps";
import InterviewSteps from "./InterviewSteps";
import {HintIcon, AiIcon, CodeIcon} from './Icons'
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/[0.4] dark:bg-grid-slate-800/[0.2] [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)] dark:[mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 gap-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600">
            Code, Learn, and Conquer
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-mono mb-10 max-w-3xl mx-auto">
            Stuck on a problem? Get a subtle hint or generate the full solution.
            Preparing for an interview? Practice with our AI-driven mock
            sessions.
          </p>
          <button
            className="bg-indigo-600 text-white font-semibold py-3 px-10 rounded-xl shadow-lg shadow-indigo-500/20 dark:shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-lg mr-3"
            onClick={() => navigate("/generate")}
          >
            Start Coding
          </button>
          <button
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-green-500/20 dark:shadow-green-600/30 hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-lg"
            onClick={() => navigate("/interview-prep")}
          >
            Start Interview
          </button>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl p-6 max-w-2xl w-full font-mono text-lg leading-relaxed shadow-2xl shadow-black/10 dark:shadow-black/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <p>
            <span className="text-pink-600 dark:text-pink-400">while</span>(
            <span className="text-sky-600 dark:text-sky-300">alive</span>)
            <span className="text-slate-500 dark:text-slate-400">{"{"}</span>
          </p>
          <div className="pl-6 border-l-2 border-gray-200 dark:border-slate-700">
            <p>
              <span className="text-green-600 dark:text-green-400">eat</span>();
            </p>
            <p>
              <span className="text-green-600 dark:text-green-400">sleep</span>
              ();
            </p>
            <p>
              <span className="text-green-600 dark:text-green-400">code</span>
              ();
            </p>
            <p>
              <span
                className="text-yellow-600 dark:text-yellow-400 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/generate")}
              >
                storeSolution
              </span>
              ();
            </p>
            <p>
              <span
                className="text-red-600 dark:text-red-400 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/interview-prep")}
              >
                practiceInterview
              </span>
              ();
            </p>
            <p>
              <span className="text-green-600 dark:text-green-400">repeat</span>
              ();
            </p>
          </div>
          <p>
            <span className="text-slate-500 dark:text-slate-400">{"}"}</span>
          </p>
        </div>
        <div className="w-full max-w-6xl text-center mt-6">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Our toolkit is designed to help you learn faster and interview
            better.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <HintIcon className="w-12 h-12 mx-auto mb-4 text-sky-500" />
              <h3 className="text-xl font-bold mb-2">Smart Hints</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get contextual hints that guide you to the solution without
                giving it all away.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <CodeIcon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
              <h3 className="text-xl font-bold mb-2">Solution Generation</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Generate complete, well-explained code solutions when you're
                truly stuck.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <AiIcon className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold mb-2">AI Mock Interviews</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Practice for technical interviews with an AI that adapts to your
                skill level.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mt-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            A Simple Workflow
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-3xl p-8 shadow-2xl shadow-black/10 dark:shadow-black/30 transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                Code Storage
              </h3>
              <CodeStoreSteps />
            </div>
            <div className="flex-1 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-3xl p-8 shadow-2xl shadow-black/10 dark:shadow-black/30 transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
                Interview Practice
              </h3>
              <InterviewSteps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
