import React, { useEffect, useState } from "react";
import { fetchAllInterviews } from "../IntervewReponses/InterviewerResponse";

const ShowInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      const allInterviews = await fetchAllInterviews();
      setInterviews(allInterviews);
    };
    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-5 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        Interview Feedback
      </h1>

      <div className="grid gap-8 max-w-5xl mx-auto">
        {interviews.map((item, index) => {
          const dateOnly = new Date(item.createdAt).toISOString().split("T")[0];

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date: {dateOnly}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.score >= 8
                      ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                      : item.score >= 5
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
                      : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                  }`}
                >
                  Score: {item.score}/10
                </span>
              </div>
              <div className="space-y-4">
                {item.questions.map((q, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 pb-3"
                  >
                    <p className="text-gray-900 dark:text-white font-semibold">
                      Question-{i + 1}: {q}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      Answer-{i + 1}: {item.responses[i]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Feedback
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {item.feedback}
                </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Recommendations
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {item.recommendations}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowInterviews;
