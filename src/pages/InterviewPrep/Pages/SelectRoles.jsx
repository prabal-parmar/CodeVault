import React from "react";
import { interviewTopics } from "../roles";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();

  const handelRole = (role) => {
    navigate(`/interview-prep/${role}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 
                 text-gray-800 dark:text-gray-200 tracking-wide"
      >
        Select a role you want to practice interview for
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {interviewTopics.map((val, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl shadow-xl 
                   bg-gradient-to-br from-indigo-100 via-slate-100 to-white
                   dark:from-slate-800 dark:via-slate-900 dark:to-slate-950
                   p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            onClick={() => handelRole(val.link)}
          >
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              {val.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {val.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;
