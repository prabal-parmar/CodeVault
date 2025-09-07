import React, { useContext, useEffect, useState } from "react";
import {
  coder0,
  coder1,
  coder2,
  coder3,
  coder4,
  coder5,
  coder6,
} from "../../assets/avatars";
import { CoderContext } from "../../context/CoderProvider";
import {
  fetchAllCodes,
  fetchAvatar,
  fetchNumOfInterviews,
  updateAvatar,
} from "../AgentResponse/agentResponse";
import { useNavigate } from "react-router-dom";
import { CodeIcon, EmailIcon, InterviewIcon } from "../Home/Icons";

const avatarOptions = {
  coder0: coder0,
  coder1: coder1,
  coder2: coder2,
  coder3: coder3,
  coder4: coder4,
  coder5: coder5,
  coder6: coder6,
};

export default function Profile() {
  const { coder, loading } = useContext(CoderContext);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [numOfCodes, setNumOfCodes] = useState(0);
  const [numOfInterviews, setNumOfInterviews] = useState(0);

  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await fetchAllCodes();
        const interviews = await fetchNumOfInterviews();
        const avatar = await fetchAvatar();
        // console.log(avatar)
        setSelectedAvatar(avatar);
        setNumOfCodes(codes);
        setNumOfInterviews(interviews);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const saveAvatar = async () => {
    try {
      const res = await updateAvatar(selectedAvatar);
      setSelectedAvatar(res);
      setShowOptions(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans transition-colors duration-300">
      <div className="bg-pattern absolute inset-0"></div>
      <div className="relative z-10 p-4 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg ring-1 ring-slate-200 dark:ring-slate-700 text-gray-900 dark:text-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-2xl transition-all duration-500 hover:shadow-3xl my-10">
          <div className="flex flex-col items-center mb-8 relative">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg ring-2 ring-slate-300 dark:ring-slate-600">
                <img
                  src={avatarOptions[selectedAvatar]}
                  alt="Profile"
                  className="w-[136px] h-[136px] md:w-[152px] md:h-[152px] rounded-full object-cover"
                />
              </div>
            </div>

            <button
              className="mt-6 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-slate-100 px-5 py-2 rounded-lg shadow-md font-medium transition-all duration-300"
              onClick={() => setShowOptions(!showOptions)}
            >
              Change Avatar
            </button>

            {showOptions && (
              <div className="absolute top-[110%] bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg ring-1 ring-slate-200 dark:ring-slate-700 p-4 rounded-xl shadow-xl grid grid-cols-3 gap-4 z-20 w-64 transition-all duration-300 origin-top animate-in fade-in-0 zoom-in-95">
                {Object.entries(avatarOptions).map(([key, avatar]) => (
                  <img
                    key={key}
                    src={avatar}
                    alt={key}
                    className={`w-16 h-16 rounded-full cursor-pointer ring-2 ${
                      selectedAvatar === key
                        ? "ring-blue-500"
                        : "ring-transparent"
                    } hover:ring-blue-500 transition-all`}
                    onClick={() => setSelectedAvatar(key)}
                  />
                ))}
                <button
                  onClick={saveAvatar}
                  className="col-span-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-colors"
                >
                  Save Avatar
                </button>
              </div>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {coder?.name || "Loading..."}
            </h2>
            <p className="text-center text-lg text-slate-500 dark:text-slate-400 font-mono">
              @{coder?.username || "loading"}
            </p>
          </div>

          <div className="my-10 p-6 bg-slate-100/50 dark:bg-slate-800/40 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 space-y-4 text-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold">
                <EmailIcon className="w-5 h-5" /> Email
              </span>
              <span className="text-slate-800 dark:text-slate-100 font-mono text-base sm:text-lg">
                {coder?.email || "Loading..."}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
              <span className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold">
                <CodeIcon className="w-5 h-5" /> Codes Generated
              </span>
              <span className="text-slate-800 dark:text-slate-100 font-mono text-base sm:text-lg">
                {numOfCodes}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
              <span className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold">
                <InterviewIcon className="w-5 h-5" /> Interviews Given
              </span>
              <span className="text-slate-800 dark:text-slate-100 font-mono text-base sm:text-lg">
                {numOfInterviews}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              onClick={() => navigate("/allcodes")}
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 mr-4 rounded-xl shadow-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-500/40"
            >
              My Codes
            </a>
            <a
              onClick={() => navigate("/interview-prep/myInterviews")}
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-3 rounded-xl shadow-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-500/40"
            >
              My Interviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
