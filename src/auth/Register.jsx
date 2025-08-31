import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CoderContext } from "../context/CoderProvider";
import { register } from "../pages/AgentResponse/agentResponse";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { coder } = useContext(CoderContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(username, email, password, name);

      // console.log("Coder Registered:", response.data);

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  if (coder) {
    return navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center transition-colors duration-500">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handelSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-700 dark:text-gray-200 mb-1 font-medium transition-colors duration-500"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-gray-700 dark:text-gray-200 mb-1 font-medium transition-colors duration-500"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-200 mb-1 font-medium transition-colors duration-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-200 mb-1 font-medium transition-colors duration-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 transition-colors duration-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600
                   text-white font-semibold transition-colors duration-500 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 transition-colors duration-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline transition-colors duration-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
