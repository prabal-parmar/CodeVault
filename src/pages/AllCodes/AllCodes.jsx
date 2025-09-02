import React, { useEffect, useState } from "react";
import axios from "axios";

function AllCodes() {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const fetchAllCodes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get/allcodes", {
          withCredentials: true,
        });
        setCodes(res.data.codes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCodes();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      {codes.length !== 0 ? (
        <div>
          {codes.map((value, index) => (
            <div
              key={index}
              className="relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg dark:shadow-xl transition-all duration-300"
            >
              <p className="text-lg font-extrabold text-blue-700 dark:text-blue-400 mb-2">
                {value.question.toUpperCase()}
              </p>

              {value.hint && (
                <p className="italic text-gray-600 dark:text-gray-300 mb-3">
                  Hint: {value.hint}
                </p>
              )}

              <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-5 rounded-lg overflow-x-auto mb-3 shadow-sm dark:shadow-md">
                {value.answer}
              </pre>

              {value.createdAt && (
                <div className="absolute bottom-3 right-4 text-sm text-gray-500 dark:text-gray-400">
                  Created on: {new Date(value.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-500">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-4 transition-colors duration-500">
            Generate and Save Your Code Instantly ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-lg transition-colors duration-500">
            Pick a problem, get hints, generate code in any language, and save
            it to your personal vault
          </p>
        </div>
      )}
    </div>
  );
}

export default AllCodes;
